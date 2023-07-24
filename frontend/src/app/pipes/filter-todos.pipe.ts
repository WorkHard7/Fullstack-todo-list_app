import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from "../interfaces/todo";

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: Todo[], value: string): Todo[] {
    if (!todos || !value && value !== '') {
      return [];
    }

    return todos.filter(todo => todo.title.toLowerCase().includes(value.toLowerCase()));
  }
}
