import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { firebase } from '../environments/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './about/about.component';
import { SingleComponent } from './single/single.component';
import { SystemComponent } from './system/system.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeasonPickerComponent } from './season-picker/season-picker.component';
import { MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { CreateNewCouponComponent } from './create-new-coupon/create-new-coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SingleComponent,
    SystemComponent,
    PageNotFoundComponent,
    SeasonPickerComponent,
    LoginComponent,
    CreateComponent,
    CreateNewCouponComponent
  ],
  entryComponents: [CreateNewCouponComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
