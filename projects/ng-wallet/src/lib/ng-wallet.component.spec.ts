import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWalletComponent } from './ng-wallet.component';

describe('NgWalletComponent', () => {
  let component: NgWalletComponent;
  let fixture: ComponentFixture<NgWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
