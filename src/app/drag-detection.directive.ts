import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDetection]'
})
export class DragDetectionDirective {
  private isDragging = false;
  private lastX: number = 0; 

  @Output() onDrag = new EventEmitter<number>();

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.lastX = this.getXPosition(event);
    // event.preventDefault();
  }

  @HostListener('document:touchmove', ['$event'])
  onMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
  
    const currentX = this.getXPosition(event);
    const movementX = currentX - this.lastX;
  
    // Check if horizontal movement is greater than vertical movement
    const isHorizontalDrag = this.isDragHorizontal(event, movementX);
  
    if (isHorizontalDrag) {
      this.lastX = currentX;
      this.onDrag.emit(movementX);
      event.preventDefault(); // Only prevent default for horizontal drags.
    }
  }

  private isDragHorizontal(event: MouseEvent | TouchEvent, movementX: number): boolean {
    if (event instanceof TouchEvent && event.changedTouches && event.changedTouches.length) {
      const movementY = event.changedTouches[0]!.clientY - (this.lastY || 0);
      this.lastY = event.changedTouches[0]!.clientY;
      return Math.abs(movementX) > Math.abs(movementY);
    }
    return true; // Assume horizontal for MouseEvents
  }
  
  private lastY: number = 0; // Add this line near your lastX declaration.
  

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  onEnd(event: MouseEvent | TouchEvent): void {
    this.isDragging = false;
  }

  private getXPosition(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      return event.touches[0]!.clientX;
    }
    return 0;
  }
}
