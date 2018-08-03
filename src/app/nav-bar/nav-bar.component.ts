import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private _hasCreatePermissions = false;
  private userAdminSubscription: Subscription;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userAdminSubscription = this.userService
      .isUserAdmin()
      .subscribe(hasCreatePermissions => (this._hasCreatePermissions = hasCreatePermissions));
  }

  public ngOnDestroy(): void {
    this.userAdminSubscription.unsubscribe();
  }

  public get hasCreatePermissions(): boolean {
    return this._hasCreatePermissions;
  }
}
