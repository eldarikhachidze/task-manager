import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,

  ],
  providers:[
    CookieService
  ]
})
export class AuthModule { }
