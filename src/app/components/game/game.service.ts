import { Injectable } from '@angular/core';
import {Game} from "./game";
import {Store} from "@ngrx/store";
import * as moment from "moment/moment";

export function sortByReleaseDate() {
  return (a: Game, b: Game) => {
    if (moment(a.releaseDate).isBefore(b.releaseDate)) {
      return -1;
    }
    if (moment(a.releaseDate).isAfter(b.releaseDate)) {
      return 1;
    }
    return 0;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private localStorage: Storage;
  private readonly _key = 'games';
  private readonly DEFAULT_GAMES = [
    new Game('The last of us', new Date(2005, 5, 15), 'PS4', undefined, undefined),
    new Game('God of War', new Date(2010, 7, 20), 'XBOX', undefined, undefined),
    new Game('Grand Theft Auto', new Date(2020, 3, 10), 'PS2', undefined, undefined),
  ];

  constructor(private store: Store<{ games: Array<Game> }>) {
    this.localStorage = localStorage;
  }

  save(game: Game): Game {
    const data = this.findAll();
    data.push(game);
    localStorage.setItem(this._key, JSON.stringify(data));
    return game;
  }

  findAll(): Array<Game> {
    const data = localStorage.getItem(this._key);
    let parsedData: Array<Game> = !!data ? JSON.parse(data) : [];
    if (parsedData.length === 0) {
      parsedData = this.DEFAULT_GAMES;
      localStorage.setItem('games', JSON.stringify(parsedData));
    }
    return parsedData.sort(sortByReleaseDate());
  }
}
