import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectSettingComponent} from "./project-setting.component";
import {ProjectUsersComponent} from "./project-users/project-users.component";

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
      path: 'users',
      component: ProjectUsersComponent
    }]

}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSettingRoutingModule { }
