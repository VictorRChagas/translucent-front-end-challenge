import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule , MatDialogRef} from "@angular/material/dialog";
import { GamesFormComponent } from "./components/game/games-form/games-form.component";
import { provideMockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";

describe('AppComponent', () => {
  let matDialogRef: jasmine.SpyObj<MatDialogRef<GamesFormComponent>>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: MatDialogRef, useValue: matDialogRef}, provideMockStore()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'translucent'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('translucent');
  });

  it(`should open form dialog'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.dialog = jasmine.createSpyObj('MatDialogRef', ['open']);
    app.openNewGameDialog();
    expect(app.dialog.open).toHaveBeenCalled();
  });
});
