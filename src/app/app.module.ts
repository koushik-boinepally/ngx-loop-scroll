import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DragDetectionDirective } from './drag-detection.directive';
import { LoopScrollModule } from 'projects/loop-scroll/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    DragDetectionDirective
  ],
  imports: [
    BrowserModule,
    LoopScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
