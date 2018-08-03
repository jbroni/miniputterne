import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SingleComponent } from './single/single.component';
import { SystemComponent } from './system/system.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { CreateGuardService } from './create-guard.service';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'single', component: SingleComponent },
  { path: 'system', component: SystemComponent },
  { path: 'create', component: CreateCouponComponent, canActivate: [CreateGuardService] },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
