import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WaypointsService {
  userId: string

  constructor( private firestore: AngularFirestore ) {
    this.userId = localStorage.getItem('user');
   }

  createWayPoint(data) {
    var waypointsRef = this.firestore.collection("wayPoints").doc(this.userId);

    // Atomically add a new region to the "regions" array field.
    waypointsRef.update({ 
        waypoints: firebase.firestore.FieldValue.arrayUnion(data)
    });
  }

  deleteWayPoint(data) {
    var waypointsRef = this.firestore.collection("wayPoints").doc(this.userId);

    // Atomically add a new region to the "regions" array field.
    waypointsRef.update({ 
        waypoints: firebase.firestore.FieldValue.arrayRemove(data)
    });
  }

  getWayPoints() { 
    var waypointsRef = this.firestore.collection("wayPoints");
    return waypointsRef.valueChanges()
  }
}
