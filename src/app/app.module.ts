import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InfiniteCarouselComponent } from './infinite-carousel/infinite-carousel.component';
import { DragDetectionDirective } from './drag-detection.directive';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteCarouselComponent,
    DragDetectionDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
