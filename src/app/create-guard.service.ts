import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CreateGuardService implements CanActivate {
  constructor(private userService: UserService) {}

  public canActivate(): Observable<boolean> {
    return this.userService.isUserAdmin();
  }
}
