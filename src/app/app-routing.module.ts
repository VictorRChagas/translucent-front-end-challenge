import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatDialogModule],
  exports: [RouterModule],
  providers: [MatDialog]
})
export class AppRoutingModule { }
