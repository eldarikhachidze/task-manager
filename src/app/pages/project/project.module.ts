import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import {ProjectComponent} from "./project.component";
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectSettingComponent,
    ProjectListComponent,
    ProjectAddEditComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
