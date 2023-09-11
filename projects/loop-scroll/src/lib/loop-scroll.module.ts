import { NgModule } from '@angular/core';
import { LoopScrollComponent } from './loop-scroll.component';
import { DragDetectionDirective } from './drag-detection.directive';



@NgModule({
  declarations: [
    LoopScrollComponent,
    DragDetectionDirective
  ],
  imports: [
    
  ],
  exports: [
    LoopScrollComponent
  ]
})
export class LoopScrollModule { }
