import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get userIsAuthenticated(){
    return  this.authService.token
  }
  get user(){
    return this.authService.user

  }
  constructor(
    private  authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
  }
}
