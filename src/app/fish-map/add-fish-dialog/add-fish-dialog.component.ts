import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { WaypointDataService } from '../../services/waypoint-data.service';
import * as moment from 'moment';
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { AddFishService } from '../../services/add-fish.service';

export interface DialogData {   
    markerData: any;
    deleteFlag: boolean;
}

@Component({
    selector: 'add-fish-dialog',
    templateUrl: 'add-fish-dialog.component.html',
    styleUrls: ['../fish-map.component.scss']
  })
  export class AddFishDialog implements OnInit {
    wayPointData: any;
    waypointCoor: string;
    fishSpecies: string;
    fishNumber: number;
    fishFly: string;
    fishAddForm: FormGroup;
  
    constructor( public waypointDataService: WaypointDataService,
      public fb: FormBuilder,
      private dialogRef: MatDialogRef<AddFishDialog>,
      private addFishService: AddFishService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.waypointCoor = data.markerData
      }
  
      ngOnInit(): void {
        this.fishAddForm = this.fb.group({
          species: '',
          numFish: 0,
          fly: ''
        })

        this.fishAddForm.valueChanges.subscribe((addFishFormData => {
          this.fishSpecies = addFishFormData.species
          this.fishNumber = addFishFormData.numFish
          this.fishFly = addFishFormData.fly
        }))
      }

      addFish(): void {
        console.log(this.waypointCoor, this.fishNumber, this.fishSpecies, this.fishFly)
        this.addFishService.postFish(this.waypointCoor, this.fishNumber, this.fishSpecies, this.fishFly)
      }
  
      close(): void {
        this.dialogRef.close();
      }
  
  }