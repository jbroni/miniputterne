import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _user: User | null = null;
  private userSubscription: Subscription;

  constructor(private fireAuth: AngularFireAuth) {}

  ngOnInit() {
    this.userSubscription = this.fireAuth.user.subscribe(user => {
      this._user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public get user(): User | null {
    return this._user;
  }

  public login(): void {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout(): void {
    this.fireAuth.auth.signOut();
  }
}
