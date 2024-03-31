import {Component} from '@angular/core';
import {Todo} from "../../interfaces/todo";
import {ToDoService} from "../../services/to-do.service";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-archived-todos-btn',
  templateUrl: './archived-todos-btn.component.html',
  styleUrls: ['./archived-todos-btn.component.scss']
})
export class ArchivedTodosBtnComponent {
  showArchivedTodos: boolean = false;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  archivedTodos: Todo[] = [];

  constructor(private toDoService: ToDoService) {
    toDoService.getArchivedTodos()
      .subscribe({
        next: (todos: Todo[]) => {
          this.archivedTodos = todos;
        },
        error: (err) => console.error('An error occurred while fetching archived todos', err)
      })

    this.toDoService.archivedTodos$.subscribe({
      next: (todos: Todo[]) => {
        this.archivedTodos = todos;
      }
    })
  }

  toggleArchivedTodo(): void {
    this.showArchivedTodos = !this.showArchivedTodos;
  }
}
