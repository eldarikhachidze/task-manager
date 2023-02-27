import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { ProjectInfoComponent } from './containers/project-info/project-info.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { IssueTypesComponent } from './containers/issue-types/issue-types.component';
import { ProjectUsersComponent } from './containers/project-users/project-users.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {BoardAddEditComponent} from "./containers/board-add-edit/board-add-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CdkDropList} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    ProjectInfoComponent,
    ProjectBoardComponent,
    IssueTypesComponent,
    BoardAddEditComponent,
    ProjectUsersComponent,

  ],
  imports: [
    CommonModule,
    ProjectSettingRoutingModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    CdkDropList
  ]
})
export class ProjectSettingModule { }
