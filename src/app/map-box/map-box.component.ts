import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from './../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  map: any = mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  constructor() { }
  
  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}