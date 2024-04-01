import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchValue: string = '';

  onSearchPerform(inputValue: string): void {
    this.searchValue = inputValue;
  }
}
