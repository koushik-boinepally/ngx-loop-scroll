
# ngx-loop-scroll

A simple Angular library to create infinitely scrolling items in a loop. This library offers a seamless looping scroll experience for your Angular projects.

## Demo
A live demo can be found [here](#). The demo is hosted on [Stackblitz](https://stackblitz.com/). 

## Installation
```bash
npm install ngx-loop-scroll --save
```
## Importing the module
```typescript
import { LoopScrollModule } from 'ngx-loop-scroll'
```

## Usage
Simply wrap your list of items inside the `ngx-loop-scroll` component:

```html
<ngx-loop-scroll direction="right" [height]="250">
    <div *ngFor="let item of items; let i = index;" class="item">
        <div>{{i}}</div>
    </div>
</ngx-loop-scroll>
```

### Parameters:

- **direction** (Required): The direction in which the items should scroll. Accepts values 'left' or 'right'.
- **height** (Required): The height of the scrolling area. This should be given as a binding.
- **[autoplay]** (Optional): Set this to `true` to enable autoplay. Default is `false`.
- **[animationSpeed]** (Optional): The speed at which the items should animate/scroll.

## Limitations
- Currently, only horizontal scrolling is supported.
- Feel free to contribute to this project and add more features.

## License
MIT

---

Feel free to contribute to this project and raise issues if you find any.
