import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        DragDropModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class DashboardModule { }
