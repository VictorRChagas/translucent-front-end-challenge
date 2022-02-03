import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { GamesFormComponent } from "./components/game/games-form/games-form.component";
import { FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { filterGames } from "./state/actions/game.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translucent';
  gameTitle = new FormControl('');

  constructor(public dialog: MatDialog,
              public _store: Store<any>) {
    this.gameTitle.valueChanges
      .subscribe(title => this.filterByTitle(title));
  }

  openNewGameDialog(): void {
    this.dialog.open(GamesFormComponent, {
      width: '50%',
      height: '50'
    });
  }

  filterByTitle(title: string): void {
    this._store.dispatch(filterGames({title}));
  }
}
