import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { IssueTypesComponent } from './issue-types/issue-types.component';
import { ProjectUsersComponent } from './project-users/project-users.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ProjectInfoComponent,
    ProjectBoardComponent,
    IssueTypesComponent,
    ProjectUsersComponent,

  ],
  imports: [
    CommonModule,
    ProjectSettingRoutingModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule
  ]
})
export class ProjectSettingModule { }
