import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadGames, loadGameSuccess, saveNewGame} from "./actions/game.actions";
import {concatMap, map, of, tap} from "rxjs";
import {GameService} from "../components/game/game.service";

@Injectable()
export class GameEffect {

  loadGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGames),
      concatMap(value => {
        return of(this.gameService.findAll())
          .pipe(
            map(gamesList => loadGameSuccess({gamesList}))
          );
      })
    );
  });

  newGames$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveNewGame),
      tap(action => {
        this.gameService.save(action.newGame);
      })
    );
  }, {dispatch: false});

  constructor(private actions$: Actions,
              private gameService: GameService) {
  }
}
