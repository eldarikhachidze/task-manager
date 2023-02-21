import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MainLayoutModule} from "../../features/main-layout/main-layout.module";
import {ProjectCardModule} from "../../features/project-card/project-card.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MainLayoutModule,
        ProjectCardModule,
        FormsModule
    ]
})
export class HomeModule { }
