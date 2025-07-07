import { NgModule } from '@angular/core';
import { DragDetectionDirective } from './drag-detection.directive';
import { LoopScrollComponent } from './loop-scroll.component';



@NgModule({
  declarations: [
  ],
  imports: [
    LoopScrollComponent,
    DragDetectionDirective
  ],
  exports: [
  ]
})
export class LoopScrollModule { }
