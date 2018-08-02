import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Season {
  season: number;
  weeks: DocumentReference[];
}

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private seasons: Observable<Season[]>;
  private selectedSeason: Season | undefined;

  constructor(private firestore: AngularFirestore) {
    this.seasons = this.firestore.collection<Season>('/seasons').valueChanges();
    this.seasons.subscribe(seasons => {
      if (!this.selectedSeason) {
        this.selectedSeason = _.last(seasons);
      }
    });
  }

  public getSeasons(): Observable<Season[]> {
    return this.seasons;
  }

  public getSelectedSeason(): Season | undefined {
    return this.selectedSeason;
  }

  public selectSeason(season: Season): void {
    this.selectedSeason = season;
  }
}
