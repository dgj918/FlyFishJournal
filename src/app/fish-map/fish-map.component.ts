import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { WaypointsService } from '../services/waypoints.service'
import { tileLayer, latLng, marker, icon, polyline, Map, TileLayer } from 'leaflet';
import { Subject } from 'rxjs';
import { debounceTime, scan } from 'rxjs/operators';
import { NavBarShowService } from '../services/nav-bar-show.service';
import { firestore } from 'firebase';

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
  
  constructor(private waypointService: WaypointsService, private zone: NgZone, private navBarShowService: NavBarShowService) {
    this.navBarShowService.show()
    
    // Define our base layers so we can reference them multiple times
    this.streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    this.wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Layers control object with our two base layers and the three overlay layers
    this.layersControl = {
      baseLayers: {
        'Street Maps': this.streetMaps,
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

  onMapReady(map: Map) {}

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
      this.layers.push(addMarker)
      this.layersControl.overlays[lat] = addMarker
      let addGeo = new firestore.GeoPoint(lat,long)
      this.waypointService.createWayPoint(addGeo)
    })
  }

}
