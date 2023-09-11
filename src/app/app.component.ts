import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items = Array.from({ length: 30 }, (_, i) => i);

  getColor(index: number): string{
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    return colors[index % colors.length];
  }


}
