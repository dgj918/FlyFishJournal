import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

export interface tripData {
  'date': string,
  'start': string,
  'end': string,
  'startlog': string,
  'endlog': string
}

@Injectable({
  providedIn: 'root'
})
export class SaveTripPlanService {
  userId: string

  constructor(private firestore: AngularFirestore ) { 
    this.userId = localStorage.getItem('user');
  }

  saveTrip(date: string, start: string, end: string, startLoc: string, endLoc: string): void {
    console.log(date,start,end,startLoc,endLoc)
    let tripsRef = this.firestore.collection('trips').doc(this.userId)
    .collection('userTrips').doc(date);
    
    tripsRef.set({ 
          endTime: end,
          putInLocation: startLoc,
          startTime: start,
          takeOutLocation: endLoc
      });
  }

  getTrips(): Observable<DocumentData[]> { 
    let tripsRef = this.firestore.collection('trips').doc(this.userId).collection('userTrips')

    return tripsRef.snapshotChanges()
  }
}
