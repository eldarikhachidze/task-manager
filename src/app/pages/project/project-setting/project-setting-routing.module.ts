import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectSettingComponent} from "./project-setting.component";
import {ProjectUsersComponent} from "./project-users/project-users.component";
import {ProjectInfoComponent} from "./project-info/project-info.component";
import {ProjectBoardComponent} from "./project-board/project-board.component";
import {IssueTypesComponent} from "./issue-types/issue-types.component";

const routes: Routes = [{

  path: '',
  component: ProjectSettingComponent,
  children: [

    {
      path: '',
      redirectTo: 'info',
      pathMatch: 'full'
    },
    {
      path: 'info',
      component: ProjectInfoComponent
    },
    {
      path: 'boards',
      component: ProjectBoardComponent
    },
    {
      path: 'issue-types',
      component: IssueTypesComponent
    },
    {
      path: 'users',
      component: ProjectUsersComponent
    }
    ]

}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSettingRoutingModule { }
