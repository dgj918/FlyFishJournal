import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaypointDataService {
  userId: string;
  

  constructor(private firestore: AngularFirestore) { 
    this.userId = localStorage.getItem('user');
  }

  getWayPointData(waypoint): Observable<unknown> { 
    console.log(this.userId)
    console.log(waypoint)
    var waypointsRef = this.firestore.collection("wayPointNotes").doc(this.userId).collection('notes').doc(waypoint);
    return waypointsRef.valueChanges()
  }

  setWayPointData(waypoint, date, notes): void {
    var waypointsRef = this.firestore.collection("wayPointNotes").doc(this.userId).collection('notes').doc(waypoint);
    waypointsRef.set({
      Date: date,
      Notes: notes
    })
  }
}
