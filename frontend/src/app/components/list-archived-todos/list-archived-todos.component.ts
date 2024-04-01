import {Component, OnInit} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";
import {Todo} from "../../interfaces/todo";

@Component({
  selector: 'app-list-archived-todos',
  templateUrl: './list-archived-todos.component.html',
  styleUrls: ['./list-archived-todos.component.scss']
})
export class ListArchivedTodosComponent implements OnInit {
  archivedTodos: Todo[] = [];

  constructor(
    private toDoService: ToDoService
  ) {
  }

  ngOnInit() {
    this.toDoService.archivedTodos$.subscribe({
      next: (todos: Todo[]) => {
        this.archivedTodos = todos;
      }
    })
  }

  restoreTodo(restoredTodo: Todo): void {
    this.toDoService.restoreTodo(restoredTodo);
  }

  deleteArchivedTodo(todo: Todo): void {
    this.toDoService.deleteArchivedTodo(todo);
  }
}
