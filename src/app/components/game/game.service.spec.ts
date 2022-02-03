import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { Game } from "./game";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";

describe('GameServiceService', () => {
  let service: GameService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]}
    );
    service = TestBed.inject(GameService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('save fetches the old data and add a new value', () => {
    const game = new Game('The last of us', new Date(),
      'PS4', undefined, undefined);
    const result = service.save(game);
    expect(result).toBe(game);
  });
});
