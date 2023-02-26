import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirPopUpComponent } from './confir-pop-up/confir-pop-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ConfirPopUpComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
