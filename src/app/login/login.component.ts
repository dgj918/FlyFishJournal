import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user$: Subject<any>;
  userState: any;
  currentUser: any;
  constructor(private router: Router, private afs: AngularFirestore, private  afAuth:  AngularFireAuth, private authService: AuthService) { }

  ngOnInit() {
    this.userState = this.authService.userStatus
  }

  logInUser(event) {
      console.log(event);
      console.log(event.uid)
      this.authService.changeUserStatus(true, event.uid)
      this.router.navigate(['/plan'])
      console.log('route to plan')
      
    } 

  logInError(event) {
    console.error(event);
  }
}
