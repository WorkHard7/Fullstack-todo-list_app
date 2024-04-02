import {Component, EventEmitter, Input, Output} from '@angular/core';
import {trashIcon} from "@progress/kendo-svg-icons";
import {Todo} from "../../../interfaces/todo";

@Component({
  selector: 'app-delete-todo-btn',
  templateUrl: './delete-todo-btn.component.html',
  styleUrls: ['./delete-todo-btn.component.scss']
})
export class DeleteTodoBtnComponent {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  protected readonly trashIcon = trashIcon;

  onDeleteTodo(): void {
    this.deleteTodo.emit(this.todo);
  }
}
