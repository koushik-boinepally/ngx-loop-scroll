import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InfiniteCarouselComponent } from './infinite-carousel/infinite-carousel.component';
import { DragDetectionDirective } from './drag-detection.directive';
import { LoopScrollModule } from 'projects/loop-scroll/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteCarouselComponent,
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
