import {Component, EventEmitter, Output} from '@angular/core';
import {trashIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-delete-archived-todo-btn',
  templateUrl: './delete-archived-todo-btn.component.html',
  styleUrls: ['./delete-archived-todo-btn.component.scss']
})
export class DeleteArchivedTodoBtnComponent {
  @Output() deletedTodo: EventEmitter<string> = new EventEmitter<string>();

  protected readonly trashIcon = trashIcon;

  onDeleteTodo(): void {
    this.deletedTodo.emit();
  }
}
