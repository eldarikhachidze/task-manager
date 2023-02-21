import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectComponent} from "./project.component";
import {ProjectSettingComponent} from "./project-setting/project-setting.component";
import {ProjectAddEditComponent} from "./project-add-edit/project-add-edit.component";

const routes: Routes = [
  {
    path:'',
    component: ProjectComponent,
  },
  {
    path:'add',
    component: ProjectAddEditComponent,
  },
  {
    path:'add/:id',
    component: ProjectAddEditComponent,
  },
  {
    path:'setting',
    loadChildren: () => import('./project-setting/project-setting.module').then(m => m.ProjectSettingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
