import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GamesComponent} from './components/game/games-grid/games.component';
import {GamesFormComponent} from './components/game/games-form/games-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {gameReducer} from "./state/game.reducer";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from "@ngrx/effects";
import {GameEffect} from "./state/game.effect";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GamesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    StoreModule.forRoot({games: gameReducer}, {}),
    EffectsModule.forRoot([GameEffect]),
    StoreDevtoolsModule.instrument({
      name: 'Game Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
