import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { environment } from './../../../environments/environment';

import { FlavorDestService } from '../../services/flavorDest.service';
import { StorageService } from '../../services/storage.service';

import { iStgCities } from './interfaces/stgCities';
import *  as  stgCitiesJson from './data/stg-cities.json';

declare var window: any;


@Component({
  selector: 'app-travel-choice',
  templateUrl: './travel-choice.component.html',
  styleUrls: ['./travel-choice.component.scss']
})
export class TravelChoiceComponent implements OnInit {

  welcomeTemplate: boolean = true;
  flavorTemplate: boolean = false;
  flavorDestTemplate: boolean = false;
  flavorDestOptions: any = undefined;
  flavorDestChoice: any = [];
  flavorChoice: string = '';
  formModal: any;
  userDestChoiceDroughtInfo: string = '';
  userDestChoice: any = [];
  userDestValidation: any = [];
  tourActivities: any = [];
  stgCities: iStgCities[] = [];
  infoStgCities: any = [];

  constructor(
    public FlavorDestService: FlavorDestService,
    public StorageService: StorageService
  ) {
    this.stgCities = this.getStgCities();
    this.StorageService.clearLocalStorage();
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  userForm = new FormGroup({
    flavorDest: new FormControl()
  });

  startChoice(): void {
    this.welcomeTemplate = false;
    this.flavorTemplate = true;
  }

  /**
   * The function takes the user's flavor choice and sets it to the flavorUser property of the
   * FlavorDestService. It then sets the flavorTemplate to false and the flavorDestTemplate to true. It
   * then sets the flavorDestOptions to the getDestinationFromFlavor() function of the
   * FlavorDestService. It then sets the flavorDestChoice to the getTourandActivities() function
   */
  handleFlavor(): void {
    this.flavorChoice = this.FlavorDestService.flavorUser = this.userForm.get('flavorDest')!.value;
    this.flavorTemplate = false;
    this.flavorDestTemplate = true;

    this.flavorDestOptions = this.FlavorDestService.getDestinationFromFlavor();
    this.flavorDestChoice = this.getCityData();
  }

  /**
   * The function is called when the user clicks on a destination marker on the map. The function opens
   * a modal that displays the drought information for the destination marker that was clicked
   * @param {any} userDestChoice - any - this is the object that is passed to the function. It contains
   * all the information about the destination that the user has chosen.
   */
  openFormModal(userDestChoice: any) {
    this.userDestChoiceDroughtInfo = userDestChoice.drought;
    this.formModal.show();
  }

  saveSomeThing() {
    this.formModal.hide();
  }

  /**
   * The function takes in a parameter called useValidation, which is an object that contains a
   * property called points. The function then sets the greenPoints property of the FlavorDestService
   * to the value of the points property of the useValidation object. The function then sets the
   * choosenDest property of the FlavorDestService to the value of the useValidation object. The
   * function then calls the isReadyTogotToFlight() function of the FlavorDestService
   * @param {any} useValidation - any - this is the object that is passed from the child component to
   * the parent component.
   */
  handleChoices(useValidation: any) {
    this.FlavorDestService.greenPoints = useValidation.points;
    this.userDestValidation = this.FlavorDestService.choosenDest = useValidation;
    this.FlavorDestService.isReadyTogotToFlight();
  }

  /**
   * It takes the coordinates of the destination and sends a GET request to the backend to get the tour
   * and activities data
   * @returns An array of arrays. Each array contains a location and the tour activities for that
   * location.
   */
  getCityData(): void {

    let tourActivities: any = [];
    let stgScore: any = '';
    this.flavorDestOptions[this.flavorChoice].forEach((value: any, _index: number) => {
      fetch(`${environment.backend_HTTP}/tour-activities?north=${value.latN}&west=${value.lonW}&south=${value.latS}&east=${value.lonE}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.code == 'ServerError') {
            data.isValid = false;
            data.data = [];
          }
          data.isValid = true;
          let newArray = [value, data.data];
          newArray.push({stgScore: this.getStgData(value)})
          tourActivities.push(newArray);
        })
        .catch((error) => {
          alert(error)
        });
    });
    return tourActivities;
  }

  getStgData(infoCity: any) {
    let stgTwon: any = [];
    stgTwon = Array.from(this.stgCities).find(e => e.city == infoCity.name);
       
    return stgTwon.score ? Math.ceil(stgTwon.score) : 0;
  }

  /* Getting the data from the json file and returning it as an array of objects. */
  getStgCities(): iStgCities[] {
    // source from https://euro-cities.sdgindex.org/
    let citiesParse: object = stgCitiesJson;
    return citiesParse as iStgCities[];
  }

  storeGreenMiles(points: string) {
    console.log(this.StorageService.storeItem(environment.appName, points));
  }

  getStgScore() {
    console.log(this.flavorDestChoice);
    this.flavorDestChoice.forEach((value: any) => {
      console.log(value);
    });
  }
}