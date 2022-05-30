// todo service et retourner par type (city / beach / nature)
export class TownsGeoSquare {

    BANGALORE: any = {};
    NEWYORK: any = {};
    PARIS: any = {};
    BARCELONA: any = {};
    SANFRANCISCO: any = {};
    BERLIN: any = {};
    LONDON: any = {};
    DALLAS: any = {};


    constructor() {

        // city
        this.BANGALORE =  {
            name: 'Bangalore',
            iataCode: 'BLR',
            latN: 13.023577,
            lonW: 77.536856,
            latS: 12.923210,
            lonE: 77.642256,
            drought: 'drought-INDIA.webp',
            points: 0
        };

        this.NEWYORK = {
            name: 'New York',
            iataCode: 'JFK',
            latN: 40.792027,
            lonW: -74.058204,
            latS: 40.697607,
            lonE: -73.942847,
            drought: 'drought-NEWYORK.webp',
            points: 8
        };

        this.PARIS = {
            name: 'Paris',
            iataCode: 'PAR',
            latN: 48.91,
            lonW: 2.25,
            latS: 48.80,
            lonE: 2.46,
            drought: 'drought-PARIS.webp',
            points: 10
        };

        // Beach
        this.BARCELONA = {
            name: 'Barcelona',
            iataCode: 'BCN',
            latN: 41.42,
            lonW: 2.11,
            latS: 41.347463,
            lonE: 2.228208,
            drought: 'drought-SPAIN.webp',
            points: 0
        };

        this.SANFRANCISCO = {
            name: 'San Francisco',
            iataCode: 'SFO',
            latN: 37.810980,
            lonW: -122.483716,
            latS: 37.732007,
            lonE: -122.370076,
            drought: 'drought-SANFRANCISCO.webp',
            points: 0
        };

        // Nature
        this.BERLIN = {
            name: 'Berlin',
            iataCode: 'TXL',
            latN: 52.541755,
            lonW: 13.354201,
            latS: 52.490569,
            lonE: 13.457198,
            drought: 'drought-BERLIN.webp',
            points: 10
        };

        this.LONDON = {
            name: 'London',
            iataCode: 'LHR',
            latN: 51.520180,
            lonW: -0.169882,
            latS: 51.484703,
            lonE: -0.061048,
            drought: 'drought-LONDON.webp',
            points: 8
        };

        this.DALLAS = {
            name: 'Dallas',
            iataCode: 'DAL',
            latN: 32.806993,
            lonW: -96.836857,
            latS: 32.740310,
            lonE: -96.737293,
            drought: 'drought-TEXAS.webp',
            points: 0
        };
    }
}

