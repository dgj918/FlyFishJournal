import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WaypointDataService {
  userId: string;

  constructor(private firestore: AngularFirestore) { 
    this.userId = localStorage.getItem('user');
  }

  getWayPointData(waypoint) { 
    console.log(this.userId)
    console.log(waypoint)
    var waypointsRef = this.firestore.collection("wayPointNotes").doc(this.userId).collection('notes').doc(waypoint);
    return waypointsRef.valueChanges()
  }
}
