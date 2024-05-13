# Projekt, dt208g - Programmering i TypeScript

Det här repot innehåller koden för webbplatsen [Höga Kusten-Högskolan](https://highcoast-college.netlify.app/). Webbplatsen är lösningen på projektuppgiften i kursen Programmering i TypeScript.

## Webbplatsen 

* Angular med material UI har använts för att skapa webbplatsen.
* Komponenter för footer, header, kurstabell, ramschematabell och en för varje sida startsidan, kurser, ramschema och en för "page not found".
  * Headern innehåller navigering, logotyp och backgrundsbild.
  * Footern innehåller länkar som hänvisar till använt bildmaterial och länkar till socialamedier och kontaktvägar.
  * Startsidan innehåller artiklar med information om skolan.
  * Kurssidan innehåller en tabell över hela kurslistan
  * Ramschemat innehåller en tabell över kurser som lagts till från kurslistan.
* Webbplatsen är publicerad på netlify, se länk längst upp i denna readme.
* Källkoden är kommenterad och publicerad här på github
* CSS- och HTML-koden är validerad.

## Services
* GetCoursesService
  * Hämtar data med HttpClient genom metoden GetCourses(). Metoden returnerar Courses (Alla kurser i listan).
* GetFrameScheduleService
  * Hämtar data från localStorage genom metoden GetFrameSchedule(). Metoden returnerar Courses (Alla egenvalda kurser från listan).

## TabellKomponenterna
* CourseTable
  * TypeScript klassen CourseTableComponent innehåller all kod som används till tabellen. Den hämtar data från GetCoursesService.
  * Funktioner anropas direkt från html för att hämta data eller för att agera eventlistener. 
* FrameScheduleTable
  * TypeScript klassen FrameScheduleTableComponent innehåller all kod som används till tabellen. Den hämtar data från GetFrameScheduleService.
  * Funktioner anropas direkt från html för att hämta data eller för att agera eventlistener.

## Responsivitet



## Material UI

Material UI lades till enligt den officiella guiden [Länk](https://material.angular.io/guide/getting-started).
Material UI-element lades till likt moduler där stora anpassningar har gjorts för att anpassa till datan som skulle användas.
Material används till följande:
* Navigering
* Tabeller inklusive, sortering, filtrering och paginering.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

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
