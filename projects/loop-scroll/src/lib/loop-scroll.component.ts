import { Component, Input, HostBinding, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ngx-loop-scroll',
  imports: [CommonModule],
  template: `
    <div class="carousel-container" [style.height.px]="height">
      <div class="carousel-track">
        <!-- Render the original items using the provided template -->
        <div *ngFor="let item of items; trackBy: trackByFn" class="carousel-item">
          <ng-container 
            *ngTemplateOutlet="itemTemplateRef; context: { $implicit: item }">
          </ng-container>
        </div>
        <!-- Render the cloned items for a seamless loop -->
        <div *ngFor="let item of items; trackBy: trackByFn" class="carousel-item" aria-hidden="true">
          <ng-container 
            *ngTemplateOutlet="itemTemplateRef; context: { $implicit: item }">
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      --item-width: 300px;
      --gap: 16px;
      --item-count: 5;
      --animation-duration: 20s;
    }

    .carousel-container {
      width: 100%;
      overflow: hidden;
      position: relative;
      /* The mask is even more important now to blend custom content */
      -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
      mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    
    .carousel-track {
      display: flex;
      animation: scroll var(--animation-duration) linear infinite;
    }

    .carousel-container:hover .carousel-track {
      animation-play-state: paused;
    }

    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-1 * var(--item-count) * (var(--item-width) + var(--gap)))); }
    }

    .carousel-item {
      flex-shrink: 0;
      width: var(--item-width);
      margin-right: var(--gap);
      /* We add display:flex here so the projected content fills the space */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class LoopScrollComponent {
  // --- CORE DATA AND CONFIGURATION INPUTS ---
  @Input() items: any[] = [];
  @Input() itemWidth: number = 300;
  @Input() height: number = 200;
  @Input() speed: number = 75; // Pixels per second
  @Input() gap: number = 16;

  /**
   * This is the magic!
   * @ContentChild looks for a <ng-template> passed inside the component's tags.
   * e.g., <ngx-loop-scroll><ng-template>...</ng-template></ngx-loop-scroll>
   */
  @ContentChild(TemplateRef) itemTemplateRef!: TemplateRef<any>;

  // --- HOST BINDINGS TO POWER THE CSS ANIMATION ---
  @HostBinding('style.--item-width')
  get hostItemWidth() { return `${this.itemWidth}px`; }

  @HostBinding('style.--gap')
  get hostGap() { return `${this.gap}px`; }

  @HostBinding('style.--item-count')
  get hostItemCount() { return this.items ? this.items.length : 0; }

  @HostBinding('style.--animation-duration')
  get hostAnimationDuration() {
    if (!this.items || this.items.length === 0 || this.speed === 0) {
      return '0s';
    }
    const singleCycleWidth = this.items.length * (this.itemWidth + this.gap);
    const durationInSeconds = singleCycleWidth / this.speed;
    return `${durationInSeconds}s`;
  }

  trackByFn(index: number, item: any): any {
    // A unique identifier on the item is best, otherwise fall back to index.
    return item.id || index;
  }
}