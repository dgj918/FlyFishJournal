import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarShowService {
  visStatus$: BehaviorSubject<any> = new BehaviorSubject(false);

  get visStatus(): BehaviorSubject<boolean>{
    return this.visStatus$
  }

  set visStatus(status: BehaviorSubject<boolean>){
    this.visStatus$ = status
  }

  constructor() {}

  hide(){
    this.visStatus$.next(false)
  }

  show(){
    this.visStatus$.next(true)
  }

}
