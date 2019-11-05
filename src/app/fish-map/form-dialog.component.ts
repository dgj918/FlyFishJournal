import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { WaypointDataService } from '../services/waypoint-data.service';
import * as moment from 'moment';
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { AddFishService } from '../services/add-fish.service';

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
    waypointCoor: string;
    formDate = new FormControl(new Date());
    picker: any;
    fishSpecies: string;
    fishNumber: number;
    fishFly: string;
    addFishForm: FormGroup;
  
    constructor( public waypointDataService: WaypointDataService,
      public fb: FormBuilder,
      private addFishService: AddFishService,
      private dialogRef: MatDialogRef<FormDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.waypointCoor = data.markerData
        
      }
  
      ngOnInit(): void {
        this.waypointData = this.waypointDataService.getWayPointData(this.waypointCoor)
        this.addFishForm = this.fb.group({
          number: 0,
          fly: '',
          species: ''
        })

        this.addFishForm.valueChanges.subscribe((addFishData) => {
        })
        
        this.waypointData.subscribe((result => {
          if (result != null) {
            this.markerDate = moment(result.Date)
            this.markerNotes = result.Notes
          } else {
            this.markerDate = "No Date"
            this.markerNotes = "No Notes"
          }
          this.formDate = this.markerDate
          this.catchModel = new catchData(this.markerDate, this.markerNotes, [])
        }))
      }
  
      close(): void {
        this.dialogRef.close();
      }
  
      onSubmitClick(): void {
        this.markerNotes = this.catchModel.notes
        this.markerDate = this.formDate.value
        let markerDateUnix = moment(this.markerDate).format("M, D, Y").toString()
        this.waypointDataService.setWayPointData(this.waypointCoor,markerDateUnix, this.markerNotes)
        this.dialogRef.close({markerDate: this.markerDate, markerNotes: this.markerNotes});
      }
  
  }