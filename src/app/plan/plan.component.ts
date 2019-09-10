import { Component, OnInit, NgZone } from '@angular/core';
import { NavBarShowService } from '../services/nav-bar-show.service';
import { Subject } from 'rxjs';
import { tileLayer, latLng, marker, icon, Map, TileLayer, layerGroup, LayerGroup } from 'leaflet';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
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
  planMap: Map;
  planForm: FormGroup;
  markerLayerGroup: LayerGroup;
  markerCount: number;
  startIconUrl: string;
  startShadowUrl: string;

  constructor(private navBarShowService: NavBarShowService, private zone: NgZone, private fb: FormBuilder){
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
    this.markerCount = 0;
  }

  ngOnInit(){
    this.planForm = this.fb.group({
      startDay: '',
      startTime: moment(),
      endTime: moment()
    })

    this.planForm.valueChanges.subscribe((data => {
      console.log(data)
    }))
  }

  onMapReady(map: Map) {
    this.planMap = map;
    this.markerLayerGroup = new LayerGroup().addTo(this.planMap)
  }

  addMarker(eventType: string) {
    this.zone.run(() => {
      let lat = eventType['latlng']['lat']
      let long = eventType['latlng']['lng']

      console.log(this.markerCount)
      if (this.markerCount == 2){
        this.clearMarkers()
        this.markerCount = 0
      } 
      
      if(this.markerCount == 0) {
        this.startIconUrl = '../assets/boatLaunch.png'
        this.startShadowUrl = ''
      } else if(this.markerCount == 1){
        this.startIconUrl = '../assets/flag-checkered-solid.svg'
        this.startShadowUrl = ''
      }

      let addMarker = marker([ lat, long ], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: this.startIconUrl,
          shadowUrl: this.startShadowUrl
        })
      })
      addMarker.addTo(this.markerLayerGroup)
      this.markerCount += 1
    })    
  }

  clearMarkers(){
    console.log("Clear")
    this.markerLayerGroup.clearLayers()
  }

}
