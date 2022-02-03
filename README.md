# Translucent front end challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Notes:

To save a new game some fields are required, the button of saving will be enabled
only when those fields to be filled it up.

The best approach to the feature of persisting locally would be to use the indexeddb instead of the local storage. There is some libs that abstract and make it easy to work
with indexeddb locally, but it would take some time setting up the config and getting fluent with the lib API.

I did not use any effect as supposed to save data and then re state the store due to the time of development and my availability.

I did not use any selector neither to prevent any DOM optimization.

## How to run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
