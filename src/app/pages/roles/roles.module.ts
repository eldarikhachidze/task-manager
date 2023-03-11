import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { PermissionAddEditComponent } from './permission-add-edit/permission-add-edit.component';
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatLegacyButtonModule} from "@angular/material/legacy-button";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    RolesComponent,
    RoleAddEditComponent,
    PermissionAddEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent
      },
      {
        path: 'permission/:roleId',
        component: PermissionAddEditComponent
      }
    ]),
    MatTableModule,
    MatLegacyButtonModule,
    MatPaginatorModule,
  ]
})
export class RolesModule { }
