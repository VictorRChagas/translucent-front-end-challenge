import { Component, OnInit } from '@angular/core';
import { Game } from "../game";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { loadGames } from "../../../state/actions/game.actions";
import * as moment from "moment";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})
export class GamesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'releaseDate', 'console', 'personalNotes', 'completionDate', 'age'];
  dataSource: Array<Game> = [];
  games$: Observable<Array<Game>>;

  constructor(public store: Store<{ games: Array<Game> }>) {
    this.games$ = this.store.select('games');
  }

  getWrittenAge(game: Game): string {
    const yearDifference = moment(game.releaseDate).diff(new Date(), 'years') * -1;
    const monthsDifference = moment(game.releaseDate).diff(new Date(), 'months') * -1;
    const days = moment(game.releaseDate).diff(new Date(), 'days') * -1;

    if (yearDifference > 0) {
      return `${yearDifference} years old`;
    } else if (monthsDifference > 0) {
      return `${monthsDifference} months old`;
    }
    return `${days} days old`;
  }

  ngOnInit(): void {
    this.store.dispatch(loadGames());
  }
}
