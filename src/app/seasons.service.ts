import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Season {
  season: number;
  weeks?: DocumentReference[]; // TODO remove optional when data quality has improved
}

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private seasons: Observable<Season[]>;
  private selectedSeason: BehaviorSubject<Season | undefined>;

  constructor(private firestore: AngularFirestore) {
    this.seasons = this.firestore.collection<Season>('/seasons').valueChanges();
    this.seasons.subscribe(seasons => {
      if (!this.selectedSeason.getValue()) {
        this.selectSeason(_.last(seasons));
      }
    });

    this.selectedSeason = new BehaviorSubject<Season | undefined>(undefined);
  }

  public getSeasons(): Observable<Season[]> {
    return this.seasons;
  }

  public getSelectedSeason(): BehaviorSubject<Season | undefined> {
    return this.selectedSeason;
  }

  public selectSeason(season: Season): void {
    this.selectedSeason.next(season);
  }
}
