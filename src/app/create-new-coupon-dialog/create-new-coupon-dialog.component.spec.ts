import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCouponDialogComponent } from './create-new-coupon-dialog.component';

describe('CreateNewCouponDialogComponent', () => {
  let component: CreateNewCouponDialogComponent;
  let fixture: ComponentFixture<CreateNewCouponDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewCouponDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
