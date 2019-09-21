import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { WaypointDataService } from '../services/waypoint-data.service';
import * as moment from 'moment';
import { FormControl, FormArray } from '@angular/forms';

/*
Catch Data Model

*/

export class catchData {

    constructor(
      public date: Date,
      public notes: String,
      public fish: Fish[]
    ) {  }
  
  }

export interface DialogData {   
    markerData: any;
    deleteFlag: boolean;
}

export interface Fish {   
    species: string;
    number: number;
}

/*
Dialog for marker Form

*/

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'form-dialog.html',
    styleUrls: ['./fish-map.component.scss']
  })
  export class FormDialog implements OnInit {
    markerData: any;
    deleteFlag: boolean;
    waypointData: any;
    markerDate: any;
    markerNotes: any;
    markerFish: Fish[]
    catchModel: catchData;
    waypointCoor: String;
    formDate = new FormControl(new Date());
    picker: any;
  
    constructor( public waypointDataService: WaypointDataService,
      private dialogRef: MatDialogRef<FormDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(data.markerData)
        console.log(this.markerDate)
        this.waypointCoor = data.markerData
        
      }
  
      ngOnInit(): void {
        this.waypointData = this.waypointDataService.getWayPointData(this.waypointCoor)
        
        this.waypointData.subscribe((result => {
          if (result != null) {
            this.markerDate = moment(result.Date)
            console.log(result)
            this.markerNotes = result.Notes
          } else {
            this.markerDate = "No Date"
            this.markerNotes = "No Notes"
          }
          console.log(this.markerDate)
          this.formDate = this.markerDate
          console.log(this.formDate)
          this.catchModel = new catchData(this.markerDate, this.markerNotes, [])
        }))
      }
  
      close(): void {
        this.dialogRef.close();
      }
  
      onSubmitClick(): void {
        console.log(this.formDate)
        this.markerNotes = this.catchModel.notes
        this.markerDate = this.formDate.value
        console.log(this.markerDate, this.formDate)
        console.log(this.markerDate, this.markerNotes)
        let markerDateUnix = moment(this.markerDate).format("M, D, Y").toString()
        console.log(markerDateUnix)
        this.waypointDataService.setWayPointData(this.waypointCoor,markerDateUnix, this.markerNotes)
        this.dialogRef.close({markerDate: this.markerDate, markerNotes: this.markerNotes});
      }
  
  }