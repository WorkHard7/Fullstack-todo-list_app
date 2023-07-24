import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mainTitle: string = 'ToDo-List App';

  @ViewChild('btn') button!: ElementRef;

  onHeaderClick(): void {
    this.button.nativeElement.style.backgroundColor = this.generateRandomColor();
  }

  private generateRandomColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  }
}
