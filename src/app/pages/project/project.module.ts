import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import {ProjectComponent} from "./project.component";
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectSettingComponent,
    ProjectListComponent,
    ProjectAddEditComponent,

  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ProjectRoutingModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatButtonModule

  ]})
export class ProjectModule { }
