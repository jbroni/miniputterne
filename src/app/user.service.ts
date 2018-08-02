import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  public isUserAdmin(): Observable<boolean> {
    return this.fireAuth.user.pipe(
      flatMap(
        user =>
          user ? this.firestore.collection('/admins', ref => ref.where('uid', '==', user.uid)).valueChanges() : of([])
      ),
      flatMap(docs => of(!_.isEmpty(docs)))
    );
  }
}
