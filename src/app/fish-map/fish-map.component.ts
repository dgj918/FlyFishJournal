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
import { DialogOverviewExampleDialog } from './marker-dialog.component'
import { iconMap } from '../models/iconMap';
import { CdkCell } from '@angular/cdk/table';

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
  selectedIcon: string;
  selectedIconUrl: string;
  iconMap: iconMap


  
  constructor(public waypointDataService: WaypointDataService, public dialog: MatDialog, private waypointService: WaypointsService, private zone: NgZone, private navBarShowService: NavBarShowService) {
    this.iconMap = {
      'boatLaunch': 'boat-launch-black-32@2x.png',
      'canoeLaunch': 'canoe-access-black-32@2x.png',
      'fish': 'fishing-black-32@2x.png',
      'parking': 'parking-black-32@2x.png',
      'marker': 'marker-icon.png'
    } 
    this.selectedIconUrl = "../../assets/marker-icon.png"
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
    console.log("Get Waypoints")
    
    this.waypointService.getWayPoints().get().subscribe(doc => {
      if (doc.exists) {
        console.log(doc.data()['waypoints'])
          this.addMarkersToMap(doc.data()['waypoints'])
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })
  }

  addMarkersToMap(data: any){
    let waypoints = data
    
    for (let point in waypoints){
      
      this.zone.run(() => {
        let lat = waypoints[point]['coord']['_lat']
        let long = waypoints[point]['coord']['_long']
        let iconSelect = icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: '',
          shadowUrl: ''
        })

        let selectedIcon = waypoints[point]['iconType']

        console.log(iconSelect.options)
        if (selectedIcon == 'marker-icon.png'){
          iconSelect.options.iconUrl = '../assets/marker-icon.png'
          iconSelect.options.shadowUrl = '../assets/marker-shadow.png'
        } else {
          iconSelect.options.iconUrl = '../assets/' + selectedIcon
        }

        let addMarker = marker([ lat, long ], {
          icon: iconSelect
        })

        addMarker.on('click', () => {this.openDialog(addMarker)})
        this.layers.push(addMarker)
        this.layersControl.overlays[lat] = addMarker
      })
    }
  }

  addMarker(eventType: string) {
    console.log("Add Marker")
    this.zone.run(() => {
      let lat = eventType['latlng']['lat']
      let long = eventType['latlng']['lng']
      let iconSelect = icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: '',
        shadowUrl: ''
      })
      console.log(iconSelect.options)
      if (this.selectedIcon == 'marker-icon.png'){
        iconSelect.options.iconUrl = '../assets/marker-icon.png'
        iconSelect.options.shadowUrl = '../assets/marker-shadow.png'
      } else {
        iconSelect.options.iconUrl = '../assets/' + this.selectedIcon
      }

      let addMarker = marker([ lat, long ], {
        icon: iconSelect
      })
      console.log(addMarker)
      addMarker.on('click', () => {this.openDialog(addMarker)})
      this.layers.push(addMarker)
      this.layersControl.overlays[lat] = addMarker
      let addGeo = new firestore.GeoPoint(lat,long)
      let iconType = this.selectedIcon
      this.waypointService.createWayPoint(addGeo, iconType)
    })
  }

  deleteMarker(){
    console.log("delMarker")
  }

  openDialog(marker): void {
    this.zone.run(() => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '350px'
      dialogConfig.data = {markerData: marker}
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result.delFlag == true) {
          this.fishMap.removeLayer(result.marker)
          let markerIcon = result.marker.options.icon.options.iconUrl
          markerIcon = markerIcon.split('/')
          markerIcon = markerIcon[2]
          let delGeo = new firestore.GeoPoint(result.marker._latlng.lat,result.marker._latlng.lng)
          this.waypointService.deleteWayPoint(delGeo, markerIcon)
        }
  
      });
    });
  }

  changeIcon(iconSelect: string): void {
    this.selectedIcon = this.iconMap[iconSelect]
    this.selectedIconUrl = '../../assets/' + this.selectedIcon
  }
}


