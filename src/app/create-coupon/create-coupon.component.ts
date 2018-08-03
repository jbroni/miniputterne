import { Component } from '@angular/core';
import { NewCouponService } from '../new-coupon.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent {
  constructor(private newCouponService: NewCouponService) {}

  public get week(): number {
    return this.newCouponService.newCouponWeek;
  }
}
