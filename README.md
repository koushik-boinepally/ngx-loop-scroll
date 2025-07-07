# ngx-loop-scroll v2.0 🚀

A modern, high-performance Angular library for creating infinitely scrolling content with support for both horizontal and vertical scrolling, touch gestures, keyboard navigation, and comprehensive accessibility features.

[![npm version](https://badge.fury.io/js/ngx-loop-scroll.svg)](https://badge.fury.io/js/ngx-loop-scroll)
[![Angular](https://img.shields.io/badge/Angular-17%2B-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎯 Core Features
- **Bidirectional Scrolling**: Full support for both horizontal and vertical infinite scrolling
- **Modern Angular**: Built with Angular 17+ and standalone components
- **Performance Optimized**: Uses signals, computed values, and optimized animations
- **TypeScript**: Fully typed with comprehensive interfaces

### 🎮 Interaction Support
- **Touch & Drag**: Smooth touch gestures for mobile and desktop
- **Keyboard Navigation**: Full keyboard support with Arrow keys, Home/End, and Space
- **Mouse Wheel**: Natural scrolling with mouse wheel
- **Snap to Items**: Optional snap-to-item functionality

### ♿ Accessibility
- **ARIA Support**: Comprehensive ARIA labels and roles
- **Screen Reader**: Live announcements for scroll changes
- **Focus Management**: Proper focus handling and visual indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

### ⚙️ Configuration
- **Animation Control**: Configurable speed, direction, and easing
- **Autoplay**: Auto-scrolling with pause-on-hover
- **Responsive**: Adapts to container size changes
- **Customizable**: Extensive configuration options

## 📦 Installation

```bash
npm install ngx-loop-scroll --save
```

## 🚀 Quick Start

### Import the Component

```typescript
import { Component } from '@angular/core';
import { LoopScrollComponent } from 'ngx-loop-scroll';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LoopScrollComponent],
  template: `
    <ngx-loop-scroll 
      direction="horizontal" 
      [scrollHeight]="300"
      [autoplay]="true"
      [speed]="2"
    >
      <div *ngFor="let item of items; let i = index" class="item">
        <h3>Item {{ i + 1 }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </ngx-loop-scroll>
  `
})
export class ExampleComponent {
  items = [
    { content: 'First item' },
    { content: 'Second item' },
    { content: 'Third item' }
  ];
}
```

### Basic Styling

```css
.item {
  min-width: 300px;
  height: 250px;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

## 📖 API Reference

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction |
| `animationDirection` | `'forward' \| 'backward'` | `'forward'` | Animation direction |
| `scrollHeight` | `number` | `250` | Container height (for horizontal scroll) |
| `scrollWidth` | `number` | `250` | Container width (for vertical scroll) |
| `speed` | `number` | `1` | Animation speed multiplier |
| `autoplay` | `boolean` | `false` | Enable auto-scrolling |
| `pauseOnHover` | `boolean` | `true` | Pause animation on hover |
| `enableKeyboard` | `boolean` | `true` | Enable keyboard navigation |
| `enableTouch` | `boolean` | `true` | Enable touch/drag gestures |
| `snapToItems` | `boolean` | `false` | Snap to items after interaction |
| `easing` | `EasingFunction` | `'linear'` | Animation easing function |
| `gap` | `number` | `10` | Gap between items (px) |
| `label` | `string` | `null` | ARIA label for accessibility |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `scrollChange` | `ScrollEvent` | Emitted when scroll position changes |
| `itemFocus` | `number` | Emitted when active item changes |
| `animationStateChange` | `'playing' \| 'paused'` | Emitted when animation state changes |

### Interfaces

```typescript
export interface ScrollEvent {
  offset: number;
  direction: 'forward' | 'backward';
  activeIndex: number;
}

export type EasingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
```

### Public Methods

```typescript
// Control animation
startAnimation(): void
stopAnimation(): void
togglePlayPause(): void

// Manual scrolling
scroll(delta: number): void
scrollToItem(index: number): void

// Get information
getCurrentItemIndex(): number
getItemCount(): number
```

## 🎮 Keyboard Navigation

| Key | Action |
|-----|--------|
| `←` / `→` | Navigate horizontally |
| `↑` / `↓` | Navigate vertically |
| `Home` | Go to first item |
| `End` | Go to last item |
| `Space` | Toggle play/pause |

## 📱 Touch Gestures

- **Swipe**: Drag to scroll content
- **Smart Detection**: Differentiates between horizontal and vertical gestures
- **Momentum**: Smooth deceleration after release
- **Snap**: Optional snap-to-item behavior

## 🎨 Examples

### Horizontal Image Carousel

```html
<ngx-loop-scroll 
  direction="horizontal"
  [scrollHeight]="400"
  [autoplay]="true"
  [speed]="1.5"
  [snapToItems]="true"
  label="Image carousel"
>
  <img 
    *ngFor="let image of images" 
    [src]="image.url" 
    [alt]="image.alt"
    class="carousel-image"
  />
</ngx-loop-scroll>
```

### Vertical News Feed

```html
<ngx-loop-scroll 
  direction="vertical"
  [scrollWidth]="350"
  [autoplay]="true"
  [speed]="0.5"
  [pauseOnHover]="true"
  label="News feed"
>
  <article *ngFor="let article of articles" class="news-item">
    <h3>{{ article.title }}</h3>
    <p>{{ article.summary }}</p>
    <time>{{ article.date | date }}</time>
  </article>
</ngx-loop-scroll>
```

### Interactive Product Showcase

```html
<ngx-loop-scroll 
  direction="horizontal"
  [scrollHeight]="500"
  [autoplay]="false"
  [enableKeyboard]="true"
  [snapToItems]="true"
  easing="ease-in-out"
  (itemFocus)="onProductFocus($event)"
  (scrollChange)="onScrollChange($event)"
>
  <div *ngFor="let product of products" class="product-card">
    <img [src]="product.image" [alt]="product.name" />
    <h3>{{ product.name }}</h3>
    <p class="price">{{ product.price | currency }}</p>
    <button (click)="addToCart(product)">Add to Cart</button>
  </div>
</ngx-loop-scroll>
```

## 🎛️ Advanced Configuration

### Custom Easing Functions

```typescript
@Component({
  template: `
    <ngx-loop-scroll 
      easing="ease-in-out"
      [speed]="2"
      [snapToItems]="true"
    >
      <!-- content -->
    </ngx-loop-scroll>
  `
})
```

### Event Handling

```typescript
export class MyComponent {
  onScrollChange(event: ScrollEvent) {
    console.log('Scroll offset:', event.offset);
    console.log('Active item:', event.activeIndex);
    console.log('Direction:', event.direction);
  }
  
  onItemFocus(index: number) {
    console.log('Focused item:', index);
    // Update UI, analytics, etc.
  }
  
  onAnimationStateChange(state: 'playing' | 'paused') {
    console.log('Animation state:', state);
  }
}
```

### Responsive Design

```css
/* Responsive container */
.carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive items */
.carousel-item {
  min-width: 300px;
  width: 100%;
  max-width: 400px;
}

@media (max-width: 768px) {
  .carousel-item {
    min-width: 250px;
    max-width: 300px;
  }
}
```

## ♿ Accessibility Features

### ARIA Support
- `role="region"` for the scroll container
- `role="listitem"` for individual items
- `aria-label` for describing the component
- `aria-live` regions for scroll announcements

### Keyboard Navigation
- Full keyboard support for navigation
- Focus management and visual indicators
- Screen reader announcements

### Reduced Motion
- Respects `prefers-reduced-motion` user setting
- Disables animations when requested

## 🔧 Migration from v0.x

### Breaking Changes

1. **Module Import** → **Standalone Component**
   ```typescript
   // Old (v0.x)
   import { LoopScrollModule } from 'ngx-loop-scroll';
   
   // New (v2.x)
   import { LoopScrollComponent } from 'ngx-loop-scroll';
   ```

2. **Property Names**
   ```html
   <!-- Old -->
   <ngx-loop-scroll [height]="250">
   
   <!-- New -->
   <ngx-loop-scroll [scrollHeight]="250">
   ```

3. **Angular Version**
   - Minimum Angular version: 17+
   - TypeScript 5.0+ required

### Migration Steps

1. Update Angular to v17+
2. Replace module imports with component imports
3. Update property names in templates
4. Test keyboard and touch interactions
5. Verify accessibility features

## 🐛 Troubleshooting

### Common Issues

**Items not scrolling smoothly**
- Ensure items have fixed dimensions
- Check if CSS transforms are being overridden
- Verify container has proper overflow settings

**Touch gestures not working**
- Make sure `enableTouch` is `true`
- Check for CSS `touch-action` conflicts
- Verify no other touch handlers are interfering

**Accessibility warnings**
- Add `label` property for screen readers
- Ensure items have proper semantic markup
- Check color contrast for focus indicators

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/koushik-boinepally/ngx-loop-scroll.git
cd ngx-loop-scroll
npm install
npm start
```

### Running Tests

```bash
npm test
npm run test:coverage
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/koushik-boinepally/ngx-loop-scroll)
- [npm Package](https://www.npmjs.com/package/ngx-loop-scroll)
- [Live Demo](https://stackblitz.com/edit/ngx-loop-scroll-v2)
- [Documentation](https://ngx-loop-scroll.docs.dev)

## 💖 Support

If you find this library useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting features
- 🤝 Contributing code

---

Made with ❤️ by [Koushik Boinepally](https://github.com/koushik-boinepally)