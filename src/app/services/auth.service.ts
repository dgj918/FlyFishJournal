import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of, BehaviorSubject, Subject } from 'rxjs'
import { switchMap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  userStatus$: Subject<any> = new Subject();
  isLoggedIn: boolean;
  redirectUrl: string;

  get userStatus(): Subject<boolean>{
    return this.userStatus$
  }

  set userStatus(status: Subject<boolean>){
    this.userStatus$ = status
  }

  constructor() {
    this.isLoggedIn = false
  }

  changeUserStatus(status: boolean, user: string){
    this.userStatus.next(status)
    this.isLoggedIn = true
    localStorage.setItem('user', user);
  }
} 
