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
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import { IssueTypeAddEditComponent } from './containers/issue-type-add-edit/issue-type-add-edit.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { ProjectEpicAddEditComponent } from './containers/project-epic-add-edit/project-epic-add-edit.component';


@NgModule({
  declarations: [
    ProjectInfoComponent,
    ProjectBoardComponent,
    IssueTypesComponent,
    BoardAddEditComponent,
    ProjectUsersComponent,
    IssueTypeAddEditComponent,
    ProjectEpicsComponent,
    ProjectEpicAddEditComponent,

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
    CdkDropList,
    MatDialogModule,
    CdkDrag,
    MatCheckboxModule
  ]
})
export class ProjectSettingModule { }
