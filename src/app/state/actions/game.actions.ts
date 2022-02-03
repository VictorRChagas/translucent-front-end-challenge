import { createAction, props } from '@ngrx/store';
import { Game } from "../../components/game/game";

export const saveNewGame = createAction('[Game Form] Save New Game', props<{newGame: Game}>());
export const filterGames = createAction('[Game Catalog] Filter Games', props<{title: string}>());
export const loadGames = createAction('[Game Component] Load Games');
export const loadGameSuccess = createAction('[Game Component] Load Game Success', props<{gamesList: Array<Game>}>());
