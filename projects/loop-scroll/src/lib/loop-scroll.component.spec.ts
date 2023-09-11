import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopScrollComponent } from './loop-scroll.component';

describe('LoopScrollComponent', () => {
  let component: LoopScrollComponent;
  let fixture: ComponentFixture<LoopScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoopScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
