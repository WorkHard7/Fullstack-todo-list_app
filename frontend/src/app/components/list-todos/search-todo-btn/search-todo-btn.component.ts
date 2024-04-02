import {Component, EventEmitter, Output} from '@angular/core';
import {searchIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-search-todo-btn',
  templateUrl: './search-todo-btn.component.html',
  styleUrls: ['./search-todo-btn.component.scss']
})
export class SearchTodoBtnComponent {
  @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>();

  inputValue: string = '';
  protected readonly searchIcon = searchIcon;

  onSearchPerform(input: HTMLInputElement): void {
    this.searchPerformed.emit(input.value);
  }
}
