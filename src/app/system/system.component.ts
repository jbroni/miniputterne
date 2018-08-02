import { Component, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../seasons.service';
import { AngularFirestore } from 'angularfire2/firestore';

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
export class SystemComponent implements OnInit {
  public rounds: Round[];

  constructor(private firestore: AngularFirestore, private seasonsService: SeasonsService) {}

  ngOnInit() {
    this.seasonsService.getSelectedSeason().subscribe(season => {
      if (season) {
        this.fetchSeasonData(season);
      }
    });
  }

  private fetchSeasonData(season: Season): void {
    this.firestore
      .collection<Round>('/rounds', ref => ref.where('season', '==', season.season))
      .valueChanges()
      .subscribe(rounds => (this.rounds = rounds));
  }
}
