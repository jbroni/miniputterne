import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewCouponService {
  private _newCouponWeek: number;

  constructor(private router: Router) {}

  public get newCouponWeek(): number {
    return this._newCouponWeek;
  }

  public createNewCoupon(week: number): void {
    this._newCouponWeek = week;
    this.router.navigate(['/create']);
  }
}
