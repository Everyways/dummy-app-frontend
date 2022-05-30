import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

import { iAircrafts } from '../../interfaces/iAircrafts';
import { FlavorDestService } from '../../services/flavorDest.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})


/* FlightSearchComponent is a component that displays a form to search for flights. */
export class FlightSearchComponent implements OnInit {
  from: any = "";
  fromLocation: any = [];
  origin: any;
  fromLocationTemplate: boolean = true;
  toLocationTemplate: boolean = false;
  to: any = "";
  destination: any;
  toLocation: any = [];
  departureDateTemplate: boolean = false
  date: any = "";
  flights: any;
  flightTemplate: boolean = false
  booked: boolean = false
  first: string = "";
  last: string = "";
  displayMap: boolean = false;
  originMap: any;
  destinationMap: any;
  aircrafts: iAircrafts[] = [];
  aircraftFootprint: any = '';
  distance: any = '';
  scoreColor: string = '';
  footprintStat: any = "";
  bAirQuality: boolean = false;
  airQualityHealthRecommandation: string = "";
  airQualityCategory: string = "";
  airQualityColor: string = "";
  airQualityDominantPolluant: string = "";
  greenMilesEarned: any = "";
  extraGreenMiles: string = "";
  totalGreenMiles: number = 0;

  constructor(
    public FlavorDestService: FlavorDestService,
    public StorageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.greenMilesEarned = this.StorageService.getItem(environment.appName);
  }

  /**
   * It fetches the data from the backend and then sets the fromLocation to the data.
   */
  handleFromLocation() {
    if (this.from.length > 3) {
      fetch(`${environment.backend_HTTP}/city-and-airport-search/${this.from}`)
        .then(response => response.json())
        .then(data => this.fromLocation = data.data)
    }
  }
  /**
   * Handle the origin location
   * @param {any} location - The location object that was selected.
   */
  handleOrigin(location: any) {
    this.origin = location;
    this.fromLocationTemplate = false;
    this.departureDateTemplate = true;
    this.fromLocation = [];
  }
  /**
   * It fetches the data from the backend and then sets the toLocation property to the data.
   */
  handleToLocation() {
    if (this.to.length > 3) {
      fetch(`${environment.backend_HTTP}/city-and-airport-search/${this.to}`)
        .then(response => response.json())
        .then(data => this.toLocation = data.data)
    }
  }

  /**
   * This function is called when the user clicks on a location in the dropdown menu. It sets the
   * destination to the location that the user clicked on, and sets the toLocationTemplate to false so
   * that the dropdown menu doesn't show up when the user types in a new location
   * @param {any} location - The location that the user has selected.
   */
  handleDestination(location: any) {
    this.destination = location;
    /* This is setting the toLocationTemplate to false so that the dropdown menu doesn't show up when
    the user types in a new location. */
    this.toLocationTemplate = false;
    this.toLocation = []
    this.departureDateTemplate = true;
  }

  /**
   * Fetch the flight data from the backend server and store it in the flights array
   */
  onFindFlight() {
    this.displayMap = true;
    if (this.date == "") {
      alert("Please choose a date")
    } else {
      fetch(`${environment.backend_HTTP}/flight-search?originCode=${this.origin.iataCode}&destinationCode=${this.FlavorDestService.choosenDest.iataCode}&dateOfDeparture=${this.date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.flights = data.data;
          this.aircrafts = this.getAircrafts(data.dictionaries.aircraft);
          this.departureDateTemplate = false;
          this.flightTemplate = true;
          this.getFootprint();
          console.log(this.aircrafts);
        })
        .catch((error) => {
          alert(error)
        });
    }
  }

    getAircrafts(data: any): iAircrafts[] {
      let aircraftParse: object = data;
      return aircraftParse as iAircrafts[];
    }

  /**
   * Fetch the flight footprint data from the backend, and then calculate the footprint score
   */
  getFootprint() {
    fetch(`${environment.backend_HTTP}/flight-footprint?originCode=${this.origin.iataCode}&destinationCode=${this.FlavorDestService.choosenDest.iataCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        this.aircraftFootprint = data.footprint.footprint;
        this.distance = data.distance;

        // average 11.9 tons per year per person
        this.footprintStat = (this.aircraftFootprint / 11900) * 100;
        if (this.footprintStat < 5) {
          this.scoreColor = 'bg-success text-white';
          this.extraGreenMiles = '10';
        }
        if (this.footprintStat > 5 && this.footprintStat < 10) {
          this.scoreColor = 'bg-warning text-dark';
          this.extraGreenMiles = '5';
        }
        if (this.footprintStat > 10) {
          this.scoreColor = 'bg-danger text-white';
          this.extraGreenMiles = '0';
        }
        this.getTotalGreenMiles();
      })
      .catch((error) => {
        alert(error)
      });
  }

  getTotalGreenMiles() {
    this.totalGreenMiles = Number(this.greenMilesEarned) + Number(this.extraGreenMiles);
  }


  /**
   * Fetch the air quality data from the backend using the destination's IATA code
   */
  getAirQuality() {
    fetch(`${environment.backend_HTTP}/air-quality?destinationCode=${this.FlavorDestService.choosenDest.iataCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        this.bAirQuality = true;
        this.airQualityCategory = data.data.indexes.baqi.category;
        this.airQualityColor = data.data.indexes.baqi.color;
        this.airQualityDominantPolluant = data.data.indexes.baqi.dominant_pollutant;
      })
      .catch((error) => {
        alert(error)
      });
  }
  /**
 * This function is used to book a flight. It takes in a flight object and a name object. It then
 * sends the flight object and name object to the backend.
 * @param {any} flight - the flight object that was selected
 * @returns The flight offers
 */
  onBookFlight(flight: any) {
    if (this.first == "" && this.last == "") {
      alert("Enter your first and last name")
      return;
    }
    const data = { flight: flight };
    const name = {
      first: this.first,
      last: this.last
    }
    const dataForBookingFlight = { flight: flight, name: name }
    fetch(`${environment.backend_HTTP}/flight-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(dataObject => {
        console.log('Success:', dataObject.data.flightOffers);
        fetch(`${environment.backend_HTTP}/flight-booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForBookingFlight),
        })
          .then(response => response.json())
          .then(data => {
            this.booked = true;
            this.flightTemplate = false
            this.flights = []
          })
          .catch((error) => {
            alert(error)
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error)
      });
  }
}