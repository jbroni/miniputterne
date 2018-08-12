import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { NewCouponService } from '../new-coupon.service';
import { Router } from '@angular/router';

interface MatchBet {
  home: boolean;
  draw: boolean;
  away: boolean;
}

interface Match {
  home: string;
  away: string;
  bets: MatchBet;
  u: MatchBet;
}

interface Coupon {
  week: number;
  system: string;
  matches: Match[];
}

const defaultColumns = ['matchNo', 'home', 'away', 'homeBet', 'drawBet', 'awayBet'];
const defaultAndUColumns = ['matchNo', 'home', 'away', 'homeBet', 'drawBet', 'awayBet', 'u'];

@Component({
  selector: 'app-create',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {
  public displayedColumns: string[] = defaultColumns;
  public coupon: Coupon;

  constructor(private newCouponService: NewCouponService, private router: Router) {}

  ngOnInit() {
    if (!this.week) {
      // Page was reloaded while on the create page and the week was lost.
      this.router.navigate(['/system']);
    } else {
      this.coupon = this.generateCoupon();
    }
  }

  public get week(): number {
    return this.newCouponService.newCouponWeek;
  }

  public updateDisplayedColumns(): void {
    this.displayedColumns = _.startsWith(this.coupon.system.toUpperCase(), 'U') ? defaultAndUColumns : defaultColumns;
  }

  private generateCoupon(): Coupon {
    return {
      week: this.week,
      system: '',
      matches: _.times(13, () => this.generateMatch())
    };
  }

  private generateMatch(): Match {
    return {
      home: '',
      away: '',
      bets: { home: false, draw: false, away: false },
      u: { home: false, draw: false, away: false }
    };
  }
}
