import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Todo} from "../interfaces/todo";
import Swal from "sweetalert2";
import {PromptUser} from "../interfaces/prompt-user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UsersAuthService} from "./users-auth.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  public toDoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public archivedTodos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])

  constructor(
    private http: HttpClient,
    private authUser: UsersAuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  getTodos(): Observable<Todo[]> {
    const headers: HttpHeaders = this.prepareHeaders();

    return this.http.get<Todo[]>('http://localhost:8080/api/todos', {headers})
      .pipe(
        tap((todos) => {
          this.toDoList$.next(todos);
        }),
        catchError((err) => {
          console.error('An error occurred while fetching todo list', err)
          return of([]);
        })
      )
  }

  getArchivedTodos(): Observable<Todo[]> {
    const headers: HttpHeaders = this.prepareHeaders();

    return this.http.get<Todo[]>('http://localhost:8080/api/todos/archived', {headers})
      .pipe(
        tap((archivedTodos) => this.archivedTodos$.next(archivedTodos)),
        catchError((err) => {
          console.error('An error occurred while fetching archived todos', err)
          return of([]);
        })
      )
  }

  addTodo(todoTitle: string): void | Observable<any> {
    const headers: HttpHeaders = this.prepareHeaders();

    // Get the value of the 'Authorization' header
    const authorizationHeader = headers.get('Authorization');

    console.log('Token all good? ', authorizationHeader);

    const newTodo: Todo = {title: todoTitle, completed: false, created_at: new Date(), updated_at: new Date()};

    if (this.todoExists(todoTitle)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This todo already exists!'
      });
      return;
    }

    const body = {
      "title": todoTitle
    }

    this.http.post<any>('http://localhost:8080/api/todos/create', body, {headers}).subscribe({
      next: (response) => {
        const todos = this.toDoList$.getValue();
        const createdTodo = response.todo;

        this.toDoList$.next([...todos, createdTodo]);
      },
      error: (err) => {
        console.error('An error occurred while adding a todo', err);
        return of([]);
      }
    })
  }

  private todoExists(newTodo: string): boolean {
    return this.toDoList$.getValue().some((todo) =>
      todo.title.toLowerCase() === newTodo.toLowerCase().trim()
    )
  }

  deleteTodo(todo: Todo): void {
    this.confirmDeleteAction({
      todo: todo,
      uuid: todo.uuid,
      message: 'Are you sure you want to delete this todo?',
      title: todo.title,
      type: 'deleteTodo'
    });
  }

  deleteArchivedTodo(todo: Todo): void {
    this.confirmDeleteAction({
      todo: todo,
      uuid: todo.uuid,
      message: `Warning! This action will delete this todo permanently!`,
      title: todo.title,
      type: 'deleteArchivedTodo'
    });
  }

  editTodo(todo: Todo): void {
    this.promptUserToEditTodo(todo);
  }

  restoreTodo(todo: Todo): void {
    this.promptUserToRestoreTodo(todo);
  }

  changeTodoStatus(todo: Todo, completed: boolean): void | Observable<any> {
    const headers: HttpHeaders = this.prepareHeaders();

    const todos: Todo[] = this.toDoList$.getValue();
    const todoToUpdateIndex = todos.findIndex((item: Todo) => item.uuid === todo.uuid);

    const body = {
      'completed': completed
    }

    if (todoToUpdateIndex !== -1) {
      this.http.put(`http://localhost:8080/api/todos/update/status/${todo.uuid}`, body, {headers}).subscribe({
        next: (response: any) => {
          todos[todoToUpdateIndex].completed = response.todo.completed;
          this.toDoList$.next([...todos]);
        },
        error: (err) => {
          console.error('An error occurred while changing todo status', err);
          return of([]);
        }
      })
    }
  }

  private confirmDeleteAction(todo: PromptUser): void | Observable<any> {
    const headers: HttpHeaders = this.prepareHeaders();
    console.log('Token all good: ', headers);

    Swal.fire({
      title: `Confirm delete: ${todo.title}`,
      html: `<span class="warn-text">${todo.message}</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'warn-text',
      }
    }).then((result) => {
      if (result.isConfirmed) {

        switch (todo.type) {
          case 'deleteArchivedTodo':

            const archivedTodos = this.archivedTodos$.getValue();
            const index = archivedTodos.findIndex((item) => item.uuid === todo.uuid);

            if (index !== -1) {
              this.http.delete(`http://localhost:8080/api/todos/archived/delete/${todo.uuid}`, {headers}).subscribe({
                next: () => {
                  archivedTodos.splice(index, 1);
                  this.archivedTodos$.next([...archivedTodos]);
                },
                error: (err) => {
                  console.error('An error occurred while deleting archived todo', err);
                  return of([]);
                }
              })
            } else {
              this.todoNotFound(todo.todo);
            }
            break;

          case 'deleteTodo':

            console.log('todo', todo);
            const todos = this.toDoList$.getValue();
            const todoIndex = todos.findIndex((item) => item.uuid === todo.todo.uuid);

            if (todoIndex !== -1) {
              this.http.delete(`http://localhost:8080/api/todos/delete/${todo.uuid}`, {headers}).subscribe({
                next: (response: any) => {

                  const archivedTodos = this.archivedTodos$.getValue();
                  const deletedTodo = response.todo;

                  todos.splice(todoIndex, 1);
                  this.toDoList$.next([...todos]);

                  if (this.archivedTodoAlreadyExists(todo.todo)) {
                    return;
                  }
                  this.archivedTodos$.next([...archivedTodos, deletedTodo]);
                },
                error: (err) => {
                  console.error('An error occurred while deleting the todo', err);
                  return of([]);
                }
              })
            } else {
              this.todoNotFound(todo.todo);
            }
            break;
        }
      }
    });
  }

  private archivedTodoAlreadyExists(todo: Todo) {
    return this.archivedTodos$.getValue().some((item) => item.title === todo.title);
  }

  private promptUserToEditTodo(todo: Todo): void {
    const headers: HttpHeaders = this.prepareHeaders();
    console.log('Token all good: ', headers);

    Swal.fire({
      title: 'Edit Todo',
      input: 'text',
      inputValue: todo.title,
      showCancelButton: true,
      confirmButtonText: 'Edit!',
      cancelButtonText: 'Cancel',
      inputValidator: (inputValue: string) => {
        if (!inputValue) {
          return 'Todo name cannot be empty!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          title: result.value
        }

        const todos = this.toDoList$.getValue();
        const index = todos.findIndex((item) => item.uuid === todo.uuid);

        if (index !== -1) {
          this.http.put(`http://localhost:8080/api/todos/update/${todo.uuid}`, body, {headers}).subscribe({
            next: ((response) => {
              todos[index].title = result.value;
              this.toDoList$.next([...todos]);
            }),
            error: (err) => {
              this.todoNotFound(todo);
            }
          })
        }
      }
    });
  }

  private promptUserToRestoreTodo(todo: Todo): void {
    const headers = this.prepareHeaders();
    console.log('Token all good: ', headers);

    Swal.fire({
        title: 'Confirm Restore',
        html: `<span class="warn-text">${todo.title}</span>`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Restore!',
        cancelButtonText: 'Cancel',
      }
    ).then((result) => {
      if (result.isConfirmed) {

        const archivedTodos = this.archivedTodos$.getValue();
        const todos = this.toDoList$.getValue();
        const archivedIndex = archivedTodos.findIndex((item) => item.uuid === todo.uuid);
        const todoIndex = todos.findIndex((item) => item.uuid === todo.uuid);

        if (this.todoAlreadyExists(todo)) {
          return this.displayToDoAlreadyExistsMessage(todo);
        }

        if (archivedIndex !== -1) {
          this.http.post(`http://localhost:8080/api/todos/archived/restore/${todo.uuid}`, {}, {headers}).subscribe({
            next: (response: any) => {
              const restoredTodo = response.todo;

              archivedTodos.splice(archivedIndex, 1);
              this.archivedTodos$.next([...archivedTodos]);

              this.toDoList$.next([...todos, restoredTodo]);
            },
            error: (err) => {
              if (err.status === 422) {
                this.displayToDoAlreadyExistsMessage(todo);
              }
            }
          });
        } else {
          this.todoNotFound(todo);
        }
      }
    });
  }

  private todoAlreadyExists(todo: Todo): boolean {
    return this.toDoList$.getValue().some((item) => item.title === todo.title);
  }

  private displayToDoAlreadyExistsMessage(todo: Todo): void {
    Swal.fire({
      title: 'Oops..todo already exists!',
      html: `<span class="warn-text">${todo.title}</span>`,
      icon: 'error',
      confirmButtonText: 'Okay!',
    });
  }

  private todoNotFound(todo: Todo): void {
    Swal.fire({
      title: 'Oops..todo not found!',
      html: `<span class="warn-text">${todo.title}</span>`,
      icon: 'error',
      confirmButtonText: 'Okay!',
    });
  }

  private prepareHeaders(): HttpHeaders {
    const token: string = this.cookieService.get('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
