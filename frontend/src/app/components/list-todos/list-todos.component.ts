import {Component, Input, OnInit} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";
import {editToolsIcon} from "@progress/kendo-svg-icons";
import {Todo} from "../../interfaces/todo";
import {Router} from "@angular/router";
import {UsersAuthService} from "../../services/users-auth.service";

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {
  @Input() searchValue!: string;

  loading: boolean = true;
  toDoList: Todo[] = [];
  protected readonly editIcon = editToolsIcon;

  constructor(private toDoService: ToDoService, private authService: UsersAuthService) {
  }

  ngOnInit(): void {
    this.loading = true;

    this.toDoService.getTodos().subscribe({
      error: (err) => {
        console.error('An error occurred while fetching todo list', err);
        this.authService.logout();
      },
      complete: () => this.loading = false
    })

    this.toDoService.toDoList$.subscribe({
      next: (todos: Todo[]) => {
        this.toDoList = todos;
      }
    })
  }

  onTodoDelete(todo: Todo): void {
    console.log('this is the todo I want to delete?', todo);
    this.toDoService.deleteTodo(todo);
  }

  editTodo(toDo: Todo): void {
    this.toDoService.editTodo(toDo);
  }

  changeTodoStatus(todo: Todo, event: any): void {
    this.toDoService.changeTodoStatus(todo, event.target.checked);
  }
}
