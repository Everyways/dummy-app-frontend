# FlightBookingFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## HTTPS on localhost
let's setup our local HTTPS server by following these steps:

- Install mkcert as indicated in its GitHub page => https://github.com/FiloSottile/mkcert#installation
- Run `mkcert -install` to install a local CA (Certification authority)
- cd to the website root
- Run this command that generated certificated for our server: `mkcert localhost 127.0.0.1 ::1`
- add to frontend angular.json
`serve: {
    "options": {
        "sslKey": "<relative path from angular.json>/server.key",
        "sslCert": "<relative path from angular.json>/server.crt"
    }, 
    ...
}`
- and then run `ng serve --ssl`