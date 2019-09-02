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
import { FormControl } from '@angular/forms';

export interface DialogData {
  markerData: any;
  deleteFlag: boolean;
}

@Component({
  selector: 'app-fish-map',
  templateUrl: './fish-map.component.html',
  styleUrls: ['./fish-map.component.scss']
})

export class FishMapComponent implements OnInit {
  eventCount = 0;
  eventLog: string = '';
  eventSubject = new Subject<string>();
  addMarkerDef: any;
  layers: Array<any>;
  streetMaps: TileLayer;
  wMaps: TileLayer;
  layersControl: any;
  options: any;
  name: any;
  fishMap: Map;
  
  constructor(public waypointDataService: WaypointDataService, public dialog: MatDialog, private waypointService: WaypointsService, private zone: NgZone, private navBarShowService: NavBarShowService) {
    this.navBarShowService.show()
    
    // Define our base layers so we can reference them multiple times
    this.streetMaps = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    detectRetina: true,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
  
    this.wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Layers control object with our two base layers and the three overlay layers
    this.layersControl = {
      baseLayers: {
        'Satellite Maps': this.streetMaps,
        'Wikimedia Maps': this.wMaps
      },
      overlays: {}
    };

    // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
    this.options = {
      zoom: 7,
      center: latLng(29.7589, -95.3677)
    };
  
    this.layers = [this.wMaps, this.streetMaps]
  }

  ngOnInit() {}

  ngAfterViewInit(){
    this.getWaypoints()
  }

  onMapReady(map: Map) {
    this.fishMap = map;
  }

  getWaypoints(){
    this.waypointService.getWayPoints().subscribe(res => {
      let userData = res[0]
      let waypoints = userData['waypoints']
      console.log(userData)
      for (let point in waypoints){
        this.zone.run(() => {
          let lat = waypoints[point]['_lat']
          let long = waypoints[point]['_long']
          console.log(lat,long)
          let addMarker = marker([ lat, long ], {
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: '../assets/marker-icon.png',
              shadowUrl: '../assets/marker-shadow.png'
            })
          })
          addMarker.on('click', () => {this.openDialog(addMarker)})
          this.layers.push(addMarker)
          this.layersControl.overlays[lat] = addMarker
        })
      }
    })
  }

  addMarker(eventType: string) {
    this.zone.run(() => {
      let lat = eventType['latlng']['lat']
      let long = eventType['latlng']['lng']
      let addMarker = marker([ lat, long ], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: '../assets/marker-icon.png',
          shadowUrl: '../assets/marker-shadow.png'
        })
      })
      addMarker.on('click', () => {this.openDialog(addMarker)})
      this.layers.push(addMarker)
      this.layersControl.overlays[lat] = addMarker
      let addGeo = new firestore.GeoPoint(lat,long)
      this.waypointService.createWayPoint(addGeo)
    })
  }

  deleteMarker(){
    console.log("delMarker")
  }

  openDialog(marker): void {
    this.zone.run(() => {
      console.log(marker)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '250px'
      dialogConfig.data = {markerData: marker}
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
        if (result.delFlag == true) {
          this.fishMap.removeLayer(result.marker)
          let delGeo = new firestore.GeoPoint(result.marker._latlng.lat,result.marker._latlng.lng)
          console.log(delGeo)
          this.waypointService.deleteWayPoint(delGeo)
        }
  
      });
    });
  }

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

/*
Catch Data Model

*/

export class catchData {

  constructor(
    public date: Date,
    public notes: String
  ) {  }

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
        this.catchModel = new catchData(this.markerDate, this.markerNotes)
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