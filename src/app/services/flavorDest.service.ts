import { Injectable } from '@angular/core';
import { TownsGeoSquare } from '../townsGeoSquare-datasets.enum';

@Injectable()
export class FlavorDestService {

  flavorBeach: string = 'beach';
  flavorCity: string = 'city';
  flavorNature: string = 'nature';
  flavorUser: string = ''
  goToFlight: boolean = false;
  flavorDest: any = [];
  destBangalore: any = '';
  destBarcelona: any = '';
  destSanFrancisco: any = '';
  destNewYork: any = '';
  destParis: any = '';
  destBerlin: any = '';
  destLondon: any = '';
  destDallas: any = '';
  choosenDest: any = [];
  greenPoints: number = 0;


  constructor(
    public TownsGeoSquare: TownsGeoSquare
  ) {
    this.destBangalore = TownsGeoSquare.BANGALORE;
    this.destBarcelona = TownsGeoSquare.BARCELONA;
    this.destSanFrancisco = TownsGeoSquare.SANFRANCISCO;
    this.destNewYork = TownsGeoSquare.NEWYORK;
    this.destParis = TownsGeoSquare.PARIS;
    this.destBerlin = TownsGeoSquare.BERLIN;
    this.destLondon = TownsGeoSquare.LONDON;
    this.destDallas = TownsGeoSquare.DALLAS;
  }

  ngOnInit(): void { }

/**
 * It returns an object with three properties, each of which is an array of strings.
 * @returns An object with three properties: beach, city, and nature. Each property has an array of
 * destinations as its value.
 */
  getDestinationFromFlavor() {
    return {
      beach: [this.destBarcelona, this.destSanFrancisco],
      city: [this.destBangalore, this.destNewYork, this.destParis],
      nature: [this.destBerlin, this.destLondon, this.destDallas]
    };
  }

  /**
   * If the user has chosen a destination, then the user is ready to go to the flight page
   */
  isReadyTogotToFlight()  {
    if (this.choosenDest) {
      this.goToFlight = true;
    }
  }
}
