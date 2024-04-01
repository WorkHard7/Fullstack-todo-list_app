import {Component, EventEmitter, Output} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";
import {plusIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  @Output() todoAdded: EventEmitter<void> = new EventEmitter<void>();
  protected readonly plusIcon = plusIcon;
  inputValue: string = '';

  constructor(private toDoService: ToDoService) {
  }

  addToDo(input: HTMLInputElement): void {
    if (input.value.trim() !== '') {
      this.toDoService.addTodo(input.value);
      this.todoAdded.emit();
      this.inputValue = '';
    }
  }
}
