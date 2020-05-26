import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AddFishService {
  userId: string;

  constructor(private firestore: AngularFirestore, public _snackBar: MatSnackBar ) { 
    this.userId = localStorage.getItem('user');
  }

  postFish(waypoint: string, num: number, species: string, fly: string): void {
    var waypointsRef = this.firestore.collection("wayPointNotes").doc(this.userId).collection("notes").doc(waypoint);

    // Atomically add a new region to the "regions" array field.
    waypointsRef.update({ 
        markerFishArr: firebase.firestore.FieldValue.arrayUnion({'fly': fly, 'number': num, 'species': species})
    })
    .then( (result) => {
      const _snackBarConfig = new MatSnackBarConfig()
      _snackBarConfig.verticalPosition = 'top'
      _snackBarConfig.duration = 3000
      this._snackBar.open('Added Fish', 'Close', _snackBarConfig)
    })
    .catch((err) => {
      this._snackBar.open('Error Adding Fish', 'Close', {
        duration: 5000
      })
    });
  }

  removeFish(waypoint: string, num: number, species: string, fly: string): Promise<void> {
    var waypointsRef = this.firestore.collection("wayPointNotes").doc(this.userId).collection("notes").doc(waypoint);
    console.log(waypoint, num, species, fly)
    // Atomically add a new region to the "regions" array field.
    return waypointsRef.update({ 
        markerFishArr: firebase.firestore.FieldValue.arrayRemove({'fly': fly, 'number': num, 'species': species})
    })
  }
}
