import {Component, EventEmitter, Output} from '@angular/core';
import {searchIcon} from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-search-todo-btn',
  templateUrl: './search-todo-btn.component.html',
  styleUrls: ['./search-todo-btn.component.scss']
})
export class SearchTodoBtnComponent {
  @Output() searchClick: EventEmitter<string> = new EventEmitter<string>();

  inputValue: string = '';
  protected readonly searchIcon = searchIcon;

  onSearchClick(input: HTMLInputElement): void {
    this.searchClick.emit(input.value);
  }
}
