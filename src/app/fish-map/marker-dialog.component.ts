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


export interface DialogData {   
    markerData: any;
    deleteFlag: boolean;
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
  
    constructor( 
      private zone: NgZone,
      private dialog: MatDialog,
      public waypointDataService: WaypointDataService,
      private dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(data.markerData)
        this.deleteFlag = false
        this.markerData = data.markerData
        let lat = this.markerData._latlng.lat
        let lng = this.markerData._latlng.lng
        this.waypointCoor = lat.toString() + lng.toString()
        this.waypointData = this.waypointDataService.getWayPointData(this.waypointCoor)
        
        this.waypointData.subscribe((result => {
          if (result != null) {
            console.log(result)
            this.markerDate = moment(result['Date'])
            this.markerNotes = result.Notes
          } else {
            this.markerDate = "No Date"
            this.markerNotes = "No Notes"
            console.log(this.markerDate)
          }
        }))
      }
  
      openFormDialog(): void {
        this.zone.run(() => {
          console.log(marker)
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '250px'
          dialogConfig.data = {markerData: this.waypointCoor}
          const dialogRef = this.dialog.open(FormDialog, dialogConfig);
    
          dialogRef.afterClosed().subscribe(result => {
            console.log('form dialog closed')
            this.markerDate = result.markerDate
            this.markerNotes = result.markerNotes
        });
        })
      };
  
      close(): void {
        console.log("oncloseClick")
        this.deleteFlag = false
        this.dialogRef.close({marker: this.markerData, delFlag: this.deleteFlag});
      }
  
      onDelClick(): void {
        console.log("onDelClick")
        this.deleteFlag = true
        this.dialogRef.close({marker: this.markerData, delFlag: this.deleteFlag});
      }
  
  }