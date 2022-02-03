import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFormComponent } from './games-form.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Injector } from "@angular/core";

describe('GamesFormComponent', () => {
  let component: GamesFormComponent;
  let fixture: ComponentFixture<GamesFormComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<GamesFormComponent>>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let store: MockStore;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    store = jasmine.createSpyObj('Store', ['dispatch']);

    const injector = Injector.create({
      providers: [
        provideMockStore({ initialState: {} }),
      ],
    });

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule],
      declarations: [ GamesFormComponent ],
      providers: [
        MatDialog,
        provideMockStore(),
        {provide: MatSnackBar, useValue: snackBar},
        {provide: MatDialogRef, useValue: matDialogRef}
      ]
    })
    .compileComponents();
    store = injector.get(MockStore);
  });

  beforeEach(() => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    fixture = TestBed.createComponent(GamesFormComponent);
    component = fixture.componentInstance;
    component._snackBar = snackBar;
    component._dialogRef = matDialogRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the value of checkbox correctly', () => {
    component.isCompleted = false;

    component.switchIsCompletedCheckbox(true);
    expect(component.isCompleted).toEqual(true);

    component.switchIsCompletedCheckbox(false);
    expect(component.isCompleted).toEqual(false);
  });

  it('Set default consoles in auto complete hard coded', () => {
    expect(component.consoles).toEqual(['PS2', 'X BOX', 'PS4', 'NINTENDO SWITCH']);
  });

  it('save method works correctly', () => {
    component.closeDialog();

    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('save method works correctly', () => {
    component.formGroup.get('title')?.setValue('Need for speed II');
    component.formGroup.get('releaseDate')?.setValue(new Date());
    component.formGroup.get('console')?.setValue('PS4');
    component.formGroup.get('personalNotes')?.setValue('That is a really good game');

    component.save();

    expect(snackBar.open).toHaveBeenCalled();
    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
