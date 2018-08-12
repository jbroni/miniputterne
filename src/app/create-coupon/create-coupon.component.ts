import { Component, OnInit } from '@angular/core';
import { NewCouponService } from '../new-coupon.service';
import { Router } from '@angular/router';

const couponData = [
  {
    id: 0,
    home: 'Liverpool',
    away: 'West Ham',
    bets: { home: false, draw: false, away: false },
    u: { home: false, draw: false, away: false }
  },
  {
    id: 1,
    home: 'Liverpool',
    away: 'West Ham',
    bets: { home: false, draw: false, away: false },
    u: { home: false, draw: false, away: false }
  },
  {
    id: 2,
    home: 'Liverpool',
    away: 'West Ham',
    bets: { home: false, draw: false, away: false },
    u: { home: false, draw: false, away: false }
  },
  {
    id: 3,
    home: 'Liverpool',
    away: 'West Ham',
    bets: { home: false, draw: false, away: false },
    u: { home: false, draw: false, away: false }
  },
  {
    id: 4,
    home: 'Liverpool',
    away: 'West Ham',
    bets: { home: false, draw: false, away: false },
    u: { home: false, draw: false, away: false }
  },
  {
    id: 5,
    home: 'Liverpool',
    away: 'West Ham',
    bets: { home: false, draw: false, away: false },
    u: { home: false, draw: false, away: false }
  }
];

@Component({
  selector: 'app-create',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {
  public displayedColumns: string[] = ['matchNo', 'home', 'away', 'homeBet', 'drawBet', 'awayBet', 'u'];
  public dataSource = couponData;

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
