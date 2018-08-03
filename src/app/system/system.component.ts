import { Component, OnDestroy, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../seasons.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { CreateNewCouponDialogComponent } from '../create-new-coupon-dialog/create-new-coupon-dialog.component';
import { Subscription } from 'rxjs';
import { NewCouponService } from '../new-coupon.service';
import { UserService } from '../user.service';

export interface MatchResult {
  home: string;
  away: string;
  result: '1' | 'x' | '2';
}

export interface Coupon {
  system: string;
  matches: Match[];
}

export interface Match {
  home: MatchBet;
  draw: MatchBet;
  away: MatchBet;
}

export interface MatchBet {
  bet: boolean;
  u: boolean;
}

export interface Round {
  coupon: Coupon;
  results: MatchResult[];
  season: number;
  week: number;
}

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {
  public rounds: Round[];
  public canCreateNewCoupon = false;
  private selectedSeasonSubscription: Subscription;
  private seasonDataSubscription: Subscription | undefined;
  private isUserAdminSubscription: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private seasonsService: SeasonsService,
    private dialog: MatDialog,
    private newCouponService: NewCouponService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.selectedSeasonSubscription = this.seasonsService.getSelectedSeason().subscribe(season => {
      if (season) {
        this.fetchSeasonData(season);
      }
    });

    this.isUserAdminSubscription = this.userService
      .isUserAdmin()
      .subscribe(isAdmin => (this.canCreateNewCoupon = isAdmin));
  }

  ngOnDestroy() {
    this.selectedSeasonSubscription.unsubscribe();
    this.isUserAdminSubscription.unsubscribe();
    if (this.seasonDataSubscription) {
      this.seasonDataSubscription.unsubscribe();
    }
  }

  public createNewCoupon(): void {
    const dialog = this.dialog.open(CreateNewCouponDialogComponent);
    const dialogClosedSubscription = dialog.afterClosed().subscribe(week => {
      dialogClosedSubscription.unsubscribe();
      if (week) {
        this.newCouponService.createNewCoupon(week);
      }
    });
  }

  private fetchSeasonData(season: Season): void {
    if (this.seasonDataSubscription) {
      this.seasonDataSubscription.unsubscribe();
    }

    this.seasonDataSubscription = this.firestore
      .collection<Round>('/rounds', ref => ref.where('season', '==', season.season))
      .valueChanges()
      .subscribe(rounds => (this.rounds = rounds));
  }
}
