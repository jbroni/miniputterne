import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { firebase } from '../environments/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularFireModule.initializeApp(firebase), AngularFirestoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
