import { Component, Input, OnChanges } from '@angular/core';
import { environment } from './../../../environments/environment';
import { POI } from './../../poi';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnChanges {

  @Input() origin: any;
  @Input() destination: any;
  @Input() flightTemplate: boolean = false;

  flightOrigin: POI;
  flightDestination: POI;
  recommandations: any;
  picture: string;

  constructor() {
    this.flightOrigin = {};
    this.flightDestination = {};
    this.recommandations = [];
    this.picture = '';
  }

  ngOnChanges() {
    this.origin !== undefined ? this.setFlightOrigin() : '';
    this.destination !== undefined ? this.setFlightDestination() : '';

    if (this.isDataValid()) {
      this.getRecommandations();
      this.getPicture();
    }

  }

  /**
   * It creates a new POI object and assigns it to the flightOrigin property
   */
  setFlightOrigin() {
    this.flightOrigin = new POI(this.origin.id, this.origin.iataCode, this.origin.geoCode.latitude, this.origin.geoCode.longitude, this.origin.name, this.origin.detailedName);
  }
  /**
   * It creates a new POI object and assigns it to the flightDestination property
   */
  setFlightDestination() {
    this.flightDestination = new POI(this.origin.id, this.origin.iataCode, this.origin.geoCode.latitude, this.origin.geoCode.longitude, this.origin.name, this.origin.detailedName);
  }
  /**
   * If the flightOrigin and flightDestination objects have no keys, then the data is not valid
   * @returns The length of the object.
   */
  isDataValid() {
    return Object.keys(this.flightOrigin).length !== 0 && Object.keys(this.flightDestination).length !== 0;
  }

  /**
   * It fetches the recommandations from the backend and stores them in the recommandations variable
   */
  getRecommandations() {
    fetch(`${environment.backend_HTTP}/reference-data/locations/pois?destinationCode=${this.flightDestination.iataCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        this.recommandations = data.data;
      })
      .catch((error) => {
        alert(error)
      });
  }

 /**
  * The function getPicture() is a function that fetches the data from the backend and stores it in the
  * variable picture
  */
  getPicture() {
    fetch(`${environment.backend_HTTP}/picture?category=BEACH`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        this.picture = data.data;
      })
      .catch((error) => {
        alert(error)
      });
  }

}
