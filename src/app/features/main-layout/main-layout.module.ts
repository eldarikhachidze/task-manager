import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule
  ],
  exports: [
    MainLayoutComponent,
    HeaderComponent,

  ],
})
export class MainLayoutModule { }
