import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { MatRipple } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WaypointsService {
  userId: string

  constructor( private firestore: AngularFirestore ) {
    this.userId = localStorage.getItem('user');
   }

  createWayPoint(geopoint, iconType) {
    console.log("create from service")
    var waypointsRef = this.firestore.collection("wayPoints").doc(this.userId);

    // Atomically add a new region to the "regions" array field.
    waypointsRef.update({ 
        waypoints: firebase.firestore.FieldValue.arrayUnion({'coord': geopoint, 'iconType': iconType})
    });
  }

  deleteWayPoint(data, icon) {
    console.log("Delete from service")
    var waypointsRef = this.firestore.collection("wayPoints").doc(this.userId);
    // Atomically add a new region to the "regions" array field.
    waypointsRef.update({ 
        waypoints: firebase.firestore.FieldValue.arrayRemove({'coord': data, 'iconType': icon})
    });
    let wref = firebase.firestore.FieldValue.arrayRemove({'coord': data, 'iconType': icon})
    console.log(wref)
  }

  getWayPoints() { 
    console.log("Get Waypoints from service")
    console.log(this.userId)
    var waypointsRef = this.firestore.collection("wayPoints").doc(this.userId);
    return waypointsRef;
  }
}
