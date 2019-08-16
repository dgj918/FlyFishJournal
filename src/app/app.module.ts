import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatIconModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FishMapComponent } from './fish-map/fish-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { PlanComponent } from './plan/plan.component';
import { ReviewComponent } from './review/review.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish, faChartBar, faMapMarkedAlt, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


@NgModule({
  declarations: [
    AppComponent,
    FishMapComponent,
    BottomNavBarComponent,
    TopNavBarComponent,
    PlanComponent,
    ReviewComponent,
    LoginComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(
      {
        apiKey: environment.firebaseConfig.apiKey,
        authDomain: environment.firebaseConfig.authDomain,
        databaseURL: environment.firebaseConfig.databaseURL,
        projectId: environment.firebaseConfig.projectId,
        storageBucket: "",
        messagingSenderId: environment.firebaseConfig.messagingSenderId, 
      },
        () => environment.firebaseConfig.appId,
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
    }),
    LeafletModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faFish, faChartBar, faMapMarkedAlt,faSignInAlt,faUserPlus,faSignOutAlt);
  }
 }
