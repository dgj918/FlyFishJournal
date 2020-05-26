import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishMapComponent } from '../app/fish-map/fish-map.component'
import { PlanComponent } from './plan/plan.component'
import { ReviewComponent } from './review/review.component'
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent },
  { path: 'fish', component: FishMapComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'plan', component: PlanComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'review', component: ReviewComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
