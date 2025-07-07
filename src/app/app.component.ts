import { Component } from '@angular/core';
import { DemoComponent } from 'projects/loop-scroll/src/lib/demo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    DemoComponent
  ]
})
export class AppComponent {
}
