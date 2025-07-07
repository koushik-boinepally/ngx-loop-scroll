import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoopScrollComponent } from './loop-scroll.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, LoopScrollComponent],
  template: `
    <div class="demo-container">
      <h2>Customer Testimonials</h2>
      <p>Seamlessly scrolling testimonials with fully custom templates.</p>

      <ngx-loop-scroll 
        [items]="testimonials"
        [itemWidth]="350"
        [height]="220"
        [speed]="60"
        [gap]="24">
        
        <!-- This is where you define the look of each item -->
        <ng-template let-testimonial>
          <div class="testimonial-card">
            <img class="avatar" [src]="testimonial.avatar" [alt]="testimonial.name">
            <div class="quote">
              "{{ testimonial.quote }}"
            </div>
            <div class="author">
              - {{ testimonial.name }}, {{ testimonial.title }}
            </div>
          </div>
        </ng-template>

      </ngx-loop-scroll>
    </div>
  `,
  styles: [`
    .demo-container {
      font-family: 'Inter', sans-serif;
      padding: 40px;
      text-align: center;
      color: #333;
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 8px;
    }
    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 40px;
    }

    /*
     * These styles belong to the DEMO component.
     * The loop-scroll component knows nothing about them.
     * This is the power of decoupling!
     */
    .testimonial-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      padding: 24px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border: 1px solid #e0e0e0;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid #764ba2;
      margin-bottom: 16px;
      object-fit: cover;
    }
    .quote {
      font-style: italic;
      color: #555;
      margin-bottom: 16px;
      font-size: 1rem;
    }
    .author {
      font-weight: 600;
      color: #764ba2;
      font-size: 0.9rem;
    }
  `]
})
export class DemoComponent {
  testimonials = [
    { id: 1, name: 'Jane Doe', title: 'CEO, Innovate Inc.', quote: 'This product transformed our workflow. Absolutely essential!', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'John Smith', title: 'Lead Developer, Tech Solutions', quote: 'The best investment we have made this year. Highly recommended.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 3, name: 'Emily White', title: 'Marketing Head, Growth Co.', quote: 'Our engagement metrics have skyrocketed since we started using this.', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 4, name: 'Michael Brown', title: 'Freelancer', quote: 'A real game-changer for my personal productivity. I can\'t imagine working without it.', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 5, name: 'Sarah Green', title: 'Project Manager, BuildIt', quote: 'Simple, intuitive, and incredibly powerful. The support is top-notch too.', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 6, name: 'David Black', title: 'CTO, Future Systems', quote: 'Technically sound and robust. It integrates perfectly with our existing stack.', avatar: 'https://i.pravatar.cc/150?img=10' },
  ];
}