import {Component, OnInit} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";
import {Todo} from "../../interfaces/todo";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-archived-todos',
  templateUrl: './list-archived-todos.component.html',
  styleUrls: ['./list-archived-todos.component.scss']
})
export class ListArchivedTodosComponent implements OnInit {
  archivedTodos: Todo[] = [];

  constructor(
    private toDoService: ToDoService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.toDoService.archivedTodos$.subscribe({
      next: (todos: any) => {
        console.log('archived to do from service: ', todos);
        this.archivedTodos = todos;
      }
    })
  }

  restoreTodo(restoredTodo: Todo): void {
    console.log('actual todo?', restoredTodo);
    this.toDoService.restoreTodo(restoredTodo);
  }

  deleteArchivedTodo(todo: Todo): void {
    console.log('actual archived todo?', todo);
    this.toDoService.deleteArchivedTodo(todo);
  }
}
