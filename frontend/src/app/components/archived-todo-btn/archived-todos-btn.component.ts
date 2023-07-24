import {Component} from '@angular/core';
import {Todo} from "../../interfaces/todo";
import {ToDoService} from "../../services/to-do.service";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {catchError, Observable, of} from "rxjs";

@Component({
  selector: 'app-archived-todos-btn',
  templateUrl: './archived-todos-btn.component.html',
  styleUrls: ['./archived-todos-btn.component.scss']
})
export class ArchivedTodosBtnComponent {
  showArchivedTodos: boolean = false;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  archivedTodos$!: Observable<Todo[]>;

  constructor(private toDoService: ToDoService) {
    this.archivedTodos$ = toDoService.getArchivedTodos()
      .pipe(
        catchError(err => of('An error occurred while fetching archived todos', err))
      )
  }

  toggleArchivedTodo(): void {
    this.showArchivedTodos = !this.showArchivedTodos;
  }
}
