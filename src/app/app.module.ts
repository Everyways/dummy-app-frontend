import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
// import { MapComponent } from './map-box/map-box.component';
import { TravelChoiceComponent } from './components/travel-choice/travel-choice.component';


import { FlavorDestService } from './services/flavorDest.service';
import { StorageService } from './services/storage.service';

import { TownsGeoSquare } from './townsGeoSquare-datasets.enum';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    RecommendationComponent,
    // MapComponent,
    TravelChoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FlavorDestService, TownsGeoSquare, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
