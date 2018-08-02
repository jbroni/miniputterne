import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _user: User | null = null;

  constructor(private fireAuth: AngularFireAuth) {}

  ngOnInit() {
    this.fireAuth.user.subscribe(user => {
      this._user = user;
      console.log(user);
    });
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
