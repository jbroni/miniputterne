import { TestBed, inject } from '@angular/core/testing';

import { NewCouponService } from './new-coupon.service';

describe('NewCouponService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewCouponService]
    });
  });

  it('should be created', inject([NewCouponService], (service: NewCouponService) => {
    expect(service).toBeTruthy();
  }));
});
