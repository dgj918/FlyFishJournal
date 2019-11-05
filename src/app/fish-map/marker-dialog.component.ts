import { OnInit, NgZone } from '@angular/core';
import { WaypointsService } from '../services/waypoints.service'
import { tileLayer, latLng, marker, icon, Map, TileLayer } from 'leaflet';
import { Subject } from 'rxjs';
import { NavBarShowService } from '../services/nav-bar-show.service';
import { firestore } from 'firebase';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { WaypointDataService } from '../services/waypoint-data.service';
import * as moment from 'moment';
import { FormControl, FormArray } from '@angular/forms';
import { FormDialog } from './form-dialog.component'
import {AddFishDialog} from './add-fish-dialog/add-fish-dialog.component'
import { AddFishService } from '../services/add-fish.service';


export interface DialogData {   
    markerData: any;
    deleteFlag: boolean;
}

export interface markerFish {   
  species: string;
  fishNum: number;
}

/*
Dialog for marker information

*/

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./fish-map.component.scss']
  })
  export class DialogOverviewExampleDialog {
    markerData: any;
    deleteFlag: boolean;
    waypointData: any;
    markerDate: any;
    markerNotes: any;
    waypointCoor: string;
    markerFishArr: markerFish[];
  
    constructor( 
      private zone: NgZone,
      public addFishService: AddFishService,
      private dialog: MatDialog,
      public waypointDataService: WaypointDataService,
      private dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.deleteFlag = false
        this.markerData = data.markerData
        let lat = this.markerData._latlng.lat
        let lng = this.markerData._latlng.lng
        this.waypointCoor = lat.toString() + lng.toString()
        this.getWaypointData()
      }

      getWaypointData(): void{
        this.waypointData = this.waypointDataService.getWayPointData(this.waypointCoor)
        
        this.waypointData.subscribe((result => {
          if (result != null) {
            this.markerDate = moment(result['Date'])
            this.markerNotes = result.Notes
            this.markerFishArr = result.markerFishArr
          } else {
            this.markerDate = "No Date"
            this.markerNotes = "No Notes"
          }
        }))
      }
  
      openFormDialog(): void {
        this.zone.run(() => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '350px'
          dialogConfig.data = {markerData: this.waypointCoor}
          const dialogRef = this.dialog.open(FormDialog, dialogConfig);
    
          dialogRef.afterClosed().subscribe(result => {
            this.markerDate = result.markerDate
            this.markerNotes = result.markerNotes
        });
        })
      };
  
      close(): void {
        this.deleteFlag = false
        this.dialogRef.close({marker: this.markerData, delFlag: this.deleteFlag});
      }
  
      onDelClick(): void {
        this.deleteFlag = true
        this.dialogRef.close({marker: this.markerData, delFlag: this.deleteFlag});
      }

      openFishDialog(){
        this.zone.run(() => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '350px'
          dialogConfig.data = {markerData: this.waypointCoor}
          const dialogRef = this.dialog.open(AddFishDialog, dialogConfig);
      
            dialogRef.afterClosed().subscribe(result => {
            });
          })
      }

      deleteFish(species, fly, number): void {
        console.log(species, fly, number)
        this.addFishService.removeFish(this.waypointCoor, number, species, fly)
        .then(() => {
          this.getWaypointData()
        })

      }
  
  }