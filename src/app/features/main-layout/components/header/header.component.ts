import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {AuthFacade} from "../../../../core/facades/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isAuth(): boolean{
    return this.authFacade.isAuth;
  }
  get user(){
    return this.authService.user

  }
  constructor(
    private  authService: AuthService,
    private authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authFacade.logout()
  }
}
