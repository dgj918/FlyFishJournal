import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatIconModule, MatButtonModule, MatNativeDateModule, MatInputModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FishMapComponent } from './fish-map/fish-map.component';
import { DialogOverviewExampleDialog } from './fish-map/marker-dialog.component'
import { FormDialog } from './fish-map/form-dialog.component'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { PlanComponent } from './plan/plan.component';
import { ReviewComponent } from './review/review.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish, faChartBar, faMapMarkedAlt, faSignInAlt, faUserPlus, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import { MomentModule } from 'ngx-moment';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { AddFishDialog } from './fish-map/add-fish-dialog/add-fish-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    FishMapComponent,
    BottomNavBarComponent,
    TopNavBarComponent,
    PlanComponent,
    ReviewComponent,
    LoginComponent,
    LandingComponent,
    MarkerPopupComponent,
    DialogOverviewExampleDialog,
    AddFishDialog,
    FormDialog,
    AddFishDialog
  ],
  imports: [
    BrowserModule,
    MatBadgeModule,
    MatCardModule,
    FlexLayoutModule,
    MomentModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule, 
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
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
    FontAwesomeModule,
    ButtonsModule.forRoot()
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, FormDialog, AddFishDialog],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faFish, faChartBar, faMapMarkedAlt,faSignInAlt,faUserPlus,faSignOutAlt, faTrashAlt);
  }
 }
