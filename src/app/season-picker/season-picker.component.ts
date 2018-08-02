import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Season, SeasonsService } from '../seasons.service';

@Component({
  selector: 'app-season-picker',
  templateUrl: './season-picker.component.html',
  styleUrls: ['./season-picker.component.css']
})
export class SeasonPickerComponent {
  constructor(private seasonsService: SeasonsService) {}

  public get seasons(): Observable<Season[]> {
    return this.seasonsService.getSeasons();
  }

  public get selectedSeason(): string {
    const selectedSeason = this.seasonsService.getSelectedSeason();
    return selectedSeason ? selectedSeason.season.toString() : '';
  }

  public selectSeason(season: Season) {
    this.seasonsService.selectSeason(season);
  }
}
