import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Season, SeasonsService } from '../seasons.service';

@Component({
  selector: 'app-season-picker',
  templateUrl: './season-picker.component.html',
  styleUrls: ['./season-picker.component.css']
})
export class SeasonPickerComponent implements OnInit, OnDestroy {
  private _selectedSeason: Season | undefined;
  private selectedSeasonSubscription: Subscription;

  constructor(private seasonsService: SeasonsService) {}

  ngOnInit() {
    this.selectedSeasonSubscription = this.seasonsService
      .getSelectedSeason()
      .subscribe(season => (this._selectedSeason = season));
  }

  ngOnDestroy() {
    this.selectedSeasonSubscription.unsubscribe();
  }

  public get seasons(): Observable<Season[]> {
    return this.seasonsService.getSeasons();
  }

  public get selectedSeason(): string {
    return this._selectedSeason ? this._selectedSeason.season.toString() : '';
  }

  public selectSeason(season: Season) {
    this.seasonsService.selectSeason(season);
  }
}
