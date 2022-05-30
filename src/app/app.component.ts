import { Component } from '@angular/core';
import { FlavorDestService } from './services/flavorDest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/* The AppComponent is the root component of our application */
export class AppComponent {
  title = 'flight-booking-frontend';
  displayMaps: boolean = false;
  constructor(
    public FlavorDestService: FlavorDestService
  ) { }

}
