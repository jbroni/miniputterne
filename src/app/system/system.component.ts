import { Component, OnDestroy, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../seasons.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { CreateNewCouponComponent } from '../create-new-coupon/create-new-coupon.component';
import { Subscription } from 'rxjs';

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
  private selectedSeasonSubscription: Subscription;
  private seasonDataSubscription: Subscription | undefined;

  constructor(private firestore: AngularFirestore, private seasonsService: SeasonsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.selectedSeasonSubscription = this.seasonsService.getSelectedSeason().subscribe(season => {
      if (season) {
        this.fetchSeasonData(season);
      }
    });
  }

  ngOnDestroy() {
    this.selectedSeasonSubscription.unsubscribe();
    if (this.seasonDataSubscription) {
      this.seasonDataSubscription.unsubscribe();
    }
  }

  public createNewCoupon(): void {
    const dialog = this.dialog.open(CreateNewCouponComponent);
    const dialogClosedSubscription = dialog.afterClosed().subscribe(result => {
      dialogClosedSubscription.unsubscribe();
      console.log(result);
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
