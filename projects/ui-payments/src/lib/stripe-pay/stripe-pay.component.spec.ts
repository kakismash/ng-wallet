import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePayComponent } from './stripe-pay.component';

describe('StripePayComponent', () => {
  let component: StripePayComponent;
  let fixture: ComponentFixture<StripePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
