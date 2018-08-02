import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _hasCreatePermissions = false;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService
      .isUserAdmin()
      .subscribe(hasCreatePermissions => (this._hasCreatePermissions = hasCreatePermissions));
  }

  public get hasCreatePermissions(): boolean {
    return this._hasCreatePermissions;
  }
}
