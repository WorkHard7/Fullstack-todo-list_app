import {Component, EventEmitter, Input, Output} from '@angular/core';
import {undoIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-restore-archived-todo-btn',
  templateUrl: './restore-archived-todo-btn.component.html',
  styleUrls: ['./restore-archived-todo-btn.component.scss']
})
export class RestoreArchivedTodoBtnComponent {
  @Input() todo: string = '';
  @Output() restoredTodo: EventEmitter<string> = new EventEmitter<string>();

  protected readonly undoIcon = undoIcon;

  restoreTodo(): void {
    this.restoredTodo.emit();
  }
}
