import { Component, OnInit } from '@angular/core';
import { NewCouponService } from '../new-coupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {
  constructor(private newCouponService: NewCouponService, private router: Router) {}

  ngOnInit() {
    if (!this.week) {
      // Page was reloaded while on the create page and the week was lost.
      this.router.navigate(['/system']);
    }
  }

  public get week(): number {
    return this.newCouponService.newCouponWeek;
  }
}
