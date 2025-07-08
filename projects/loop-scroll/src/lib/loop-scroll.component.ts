import { Component, Input, HostBinding, ContentChild, TemplateRef, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ngx-loop-scroll',
  imports: [CommonModule],
  template: `
    <div 
      class="carousel-viewport" 
      [style.height.px]="height"
      [attr.data-dragging]="isDragging"
      (wheel)="onWheel($event)"
      (pointerdown)="onPointerDown($event)"
      (pointermove)="onPointerMove($event)"
      (pointerup)="onPointerUp($event)"
      (pointerleave)="onPointerUp($event)"
    >
      <div 
        class="carousel-track"
        [style.transform]="'translateX(' + translateX + 'px)'"
      >
        <div *ngFor="let item of items; trackBy: trackByFn" class="carousel-item">
          <ng-container *ngTemplateOutlet="itemTemplateRef; context: { $implicit: item }"></ng-container>
        </div>
        <div *ngFor="let item of items; trackBy: trackByFn" class="carousel-item" aria-hidden="true">
          <ng-container *ngTemplateOutlet="itemTemplateRef; context: { $implicit: item }"></ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .carousel-viewport {
      width: 100%;
      overflow: hidden;
      position: relative;
      cursor: grab;
      -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    
    .carousel-viewport[data-dragging="true"] {
      cursor: grabbing;
    }
    
    .carousel-track {
      display: flex;
      will-change: transform;
    }
    
    .carousel-viewport[data-dragging="true"] .carousel-item {
      user-select: none;
      pointer-events: none;
    }

    .carousel-item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--item-width);
      margin-right: var(--gap);
      /*
       * THE SHADOW FIX:
       * We add vertical padding to the item's container. This creates a "safe area"
       * for the projected content's shadow to render without being clipped by the viewport's
       * overflow:hidden.
       */
      padding: var(--vertical-padding) 0;
      box-sizing: border-box;
    }
  `]
})
export class LoopScrollComponent implements OnInit, OnDestroy, OnChanges {
  // --- INPUTS & TEMPLATE ---
  @Input() items: any[] = [];
  @Input() itemWidth: number = 300;
  @Input() height: number = 200;
  @Input() speed: number = 75; 
  @Input() gap: number = 16;
  @Input() verticalPadding: number = 20; // <-- NEW: Configurable padding for shadow space

  @ContentChild(TemplateRef) itemTemplateRef!: TemplateRef<any>;

  // --- COMPONENT STATE ---
  translateX: number = 0;
  isDragging: boolean = false;
  private animationFrameId: number = 0;
  private startX: number = 0;
  private startTranslateX: number = 0;
  private cycleWidth: number = 0;
  private lastTimestamp: number = 0;
  private wheelTimeout: any = null;
  
  // --- HOST BINDINGS FOR CSS VARIABLES ---
  @HostBinding('style.--item-width') get hostItemWidth() { return `${this.itemWidth}px`; }
  @HostBinding('style.--gap') get hostGap() { return `${this.gap}px`; }
  @HostBinding('style.--vertical-padding') get hostVerticalPadding() { return `${this.verticalPadding}px`; } // <-- NEW
  
  ngOnInit(): void {
    this.calculateCycleWidth();
    this.startAnimation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['itemWidth'] || changes['gap']) {
      this.calculateCycleWidth();
      this.resetAnimation();
    }
    if (changes['speed'] && !this.isDragging) {
      this.resetAnimation();
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    clearTimeout(this.wheelTimeout);
  }

  private calculateCycleWidth(): void {
    this.cycleWidth = this.items?.length > 0 ? this.items.length * (this.itemWidth + this.gap) : 0;
  }

  // --- ANIMATION LOGIC ---

  private animate = (timestamp: number): void => {
    if (this.lastTimestamp === 0) this.lastTimestamp = timestamp;
    
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (!this.isDragging && this.speed > 0) {
      this.translateX -= (this.speed * deltaTime) / 1000;
      this.wrapTranslateX();
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  private startAnimation(): void {
    if (this.animationFrameId === 0) {
      this.lastTimestamp = 0;
      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  }

  private stopAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  private resetAnimation(): void {
    this.stopAnimation();
    this.startAnimation();
  }

  private wrapTranslateX(): void {
    if (this.cycleWidth > 0) {
      // Modulo operator handles both positive and negative wrapping
      this.translateX = ((this.translateX % this.cycleWidth) - this.cycleWidth) % this.cycleWidth;
    }
  }

  // --- EVENT HANDLERS ---

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.stopAnimation();

    // Use both deltaX and deltaY for broad trackpad support
    const moveDistance = event.deltaX + event.deltaY;
    this.translateX -= moveDistance;
    this.wrapTranslateX();

    // Debounce the animation restart
    clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(() => {
      this.startAnimation();
    }, 150); // Restart animation after 150ms of wheel inactivity
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    this.isDragging = true;
    this.startX = event.pageX;
    this.startTranslateX = this.translateX;
    this.stopAnimation();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (this.isDragging) {
      const deltaX = event.pageX - this.startX;
      this.translateX = this.startTranslateX + deltaX;
    }
  }

  onPointerUp(event: PointerEvent): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.wrapTranslateX();
      this.startAnimation();
      (event.target as HTMLElement).releasePointerCapture(event.pointerId);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}