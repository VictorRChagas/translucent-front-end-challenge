import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Game } from "../game";
import { saveNewGame } from "../../../state/actions/game.actions";
import { Store } from "@ngrx/store";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.component.html',
  styleUrls: ['./games-form.component.css'],
  providers: [
    MatSnackBar
  ]
})
export class GamesFormComponent {

  formGroup: FormGroup;
  isCompleted = false;
  consoles = ['PS2', 'X BOX', 'PS4', 'NINTENDO SWITCH'];

  constructor(public _store: Store<{ games: Array<Game> }>,
              public _snackBar: MatSnackBar,
              public _dialogRef: MatDialogRef<GamesFormComponent>) {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      releaseDate: new FormControl(undefined, [Validators.required, this.dateValidator()]),
      console: new FormControl(undefined, [Validators.required]),
      personalNotes: new FormControl(undefined),
      completionDate: new FormControl(undefined, [this.dateValidator()])
    });
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  save(): void {
    const newGame = this.buildNewGame();
    this._store.dispatch(saveNewGame({newGame}));
    this._snackBar.open('Game saved successfully!');
    this._dialogRef.close();
  }

  private buildNewGame(): Game {
    const title: string = this.formGroup.get('title')?.value;
    const releaseDate: Date = this.formGroup.get('releaseDate')?.value;
    const console: string = this.formGroup.get('console')?.value;
    const personalNotes: string = this.formGroup.get('personalNotes')?.value;
    const completionDate: Date = this.formGroup.get('completionDate')?.value;
    return new Game(title, releaseDate, console, personalNotes, completionDate);
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date: Date = control.value;
      const isInvalid = moment(date).isAfter(new Date());
      return isInvalid ? {invalidDate: {value: control.value}} : null;
    };
  }

  switchIsCompletedCheckbox(checked: boolean): void {
    this.isCompleted = checked;
  }
}
