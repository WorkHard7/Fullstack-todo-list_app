import {Component} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";
import {plusIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-add-todo-btn',
  templateUrl: './add-todo-btn.component.html',
  styleUrls: ['./add-todo-btn.component.scss']
})
export class AddTodoBtnComponent {
  protected readonly plusIcon = plusIcon;
  inputValue: string = '';

  constructor(private toDoService: ToDoService) {
  }

  addToDo(input: HTMLInputElement): void {
    if (input.value.trim() !== '') {
      this.toDoService.addTodo(input.value);
      input.value = '';
      this.inputValue = '';
    }
  }
}
