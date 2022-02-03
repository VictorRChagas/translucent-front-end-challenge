import {createReducer, on} from '@ngrx/store';
import {filterGames, loadGames, loadGameSuccess, saveNewGame} from './actions/game.actions';
import {Game} from "../components/game/game";
import {sortByReleaseDate} from "../components/game/game.service";

export const initialState: Array<Game> = [];

export const gameReducer = createReducer(
  initialState,
  on(saveNewGame, (state, action) => {
    const valuesCopied = state.slice(0);
    valuesCopied.push(action.newGame);
    return valuesCopied;
  }),
  on(loadGames, (state) => state),
  on(loadGameSuccess, (state, action) => [...state, ...action.gamesList]),
  on(filterGames, (state, action) => {
    const hasValidTyping = !!action.title && action.title.trim() !== '';
    if (hasValidTyping) {
      return state.filter(game => game.title.toLowerCase().indexOf(action?.title?.toLowerCase()) > -1);
    }
    const savedGames: Array<Game> = JSON.parse(localStorage.getItem('games') ?? '');
    return savedGames;
  }),
);
