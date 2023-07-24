import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {Todo} from "../interfaces/todo";
import {ToDoService} from "../services/to-do.service";

export const ArchivedTodosResolver: ResolveFn<Todo[]> = () => {
  const toDoService = inject(ToDoService);

  return toDoService.getArchivedTodos()
    .pipe(
      catchError((error: any) => {
        return of([]);
      })
    );
}
