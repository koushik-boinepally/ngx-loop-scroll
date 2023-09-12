import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-loop-scroll',
  template: `
    <style>
      :host {
        position: relative;
        overflow: hidden;
      }

      .viewport {
        transform: translateX(-250px); // TODO - make this offset dynamic
      }
    </style>
    <div class="viewport" (mouseover)="mouseover($event)" 
    (mouseleave)="mouseleave($event)" appDragDetection 
    (onDrag)="handleDrag($event)" (mousewheel)="mousewheel($event)" >
        <div class="container">
            <ng-content></ng-content>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class LoopScrollComponent implements AfterViewInit {

  offset: number = 0; // initial value

  containerWidth = 250;
  containerHeight = 250;

  increment = 1;

  itemCount = 7;

  _direction: 'left' | 'right' = 'right';

  @Input() set direction(direction: 'left' | 'right') {
    this._direction = direction;
    this.increment = direction === 'left' ? -1 : 1;
  }

  @Input() set height(height: number) {
    this.containerHeight = height;
  }

  _autoplay = false;
  @Input() set autoplay(autoplay: boolean) {
    this._autoplay = autoplay;
    if (autoplay) {
      this.animateOffset();
    }
  }

  _animationSpeed = 1;
  @Input() set animationSpeed(speed: number) {
    this._animationSpeed = speed;
    this.increment = speed;
  }


  constructor(private el: ElementRef) { }

  handleDrag(movementX: number): void {
    // Handle horizontal dragging
    this.updateOffset(movementX);
  }

  mousewheel(event: Event): void {
    this.updateOffset((event as WheelEvent).deltaX);
  }

  mouseover(event: MouseEvent): void {
    this.increment = 0;
  }

  mouseleave(event: MouseEvent): void {
    this.increment = this._direction === 'left' ? -this._animationSpeed : this._animationSpeed;
  }

  containerDiv?: HTMLDivElement;
  viewportDiv?: HTMLDivElement;
  ngAfterViewInit(): void {

    this.containerDiv = this.el.nativeElement.querySelector('.container');
    this.viewportDiv = this.el.nativeElement.querySelector('.viewport');

    let containerWidth = 0;
    let itemCount = 0;
    for (const item of this.containerDiv!.children as any) {
      containerWidth += item.offsetWidth + 10; // assuming padding of 10px for simplicity
      itemCount++;
      // Set position to absolute to allow for positioning
      item.style.position = 'absolute';
    }

    this.itemCount = itemCount;

    this.containerWidth = containerWidth;
    this.containerDiv!.style.height = `${this.containerHeight}px`;

    this.containerDiv!.style.width = `${this.containerWidth}px`;

    this.viewportDiv!.style.transform = `translateX(-${400}px)`;

    this.positionItems();

    this.animateOffset();

  }

  getColor(index: number): string {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    return colors[index % colors.length];
  }

  positionItems(): void {

    // Wait for the view to render before querying the DOM.
    if (!this.containerDiv) {
      return;
    }

    // Query the DOM to get the children of the `div` with class `container`.
    // const container = this.el.nativeElement.querySelector('.container');
    const items = this.containerDiv!.children;

    // Calculate the total width of the container.
    let containerWidth = this.containerDiv!.offsetWidth;

    // Ensure offset is always positive using modulo
    this.offset = (this.offset + containerWidth) % containerWidth;

    // Get a rounded value of the current position to avoid potential floating point precision errors
    let currentPosition = Math.round(this.offset) % Math.round(containerWidth);

    for (let i = 0; i < items.length; i++) {
      let item = items[i] as HTMLDivElement;
      // Setting the position of the item
      item.style.left = `${currentPosition}px`;
      // Adding width and padding (assuming padding of 10px for simplicity)
      currentPosition += item.offsetWidth + 10;

      // Center the items vertically.
      item.style.top = `${(this.containerDiv!.offsetHeight - item.offsetHeight) / 2}px`;

      // If we reach end of the container width, subtract the container width from the current position
      if (currentPosition > containerWidth) {
        currentPosition -= (item.offsetWidth + 10) * this.itemCount;
      }

    }

  }

  updateOffset(newOffset: number): void {
    this.offset += newOffset;
    // Normalize the offset to ensure it doesn't go wildly out of range
    this.offset = this.offset % (this.containerWidth * 2); // using twice the containerWidth to keep it in a safe range
    this.positionItems();
  }

  animateOffset() {
    const update = () => {
      this.updateOffset(this.increment);
      if (this._autoplay) {
        requestAnimationFrame(update);
      }
    };
    update();
  }


}
