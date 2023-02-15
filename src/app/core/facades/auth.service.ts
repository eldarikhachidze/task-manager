import { Injectable } from '@angular/core';
import {CookieStorageService} from "../services/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  get isAuth(): boolean {
    return !!this.cookieService.getCookie('accessToken')
  }
  constructor(
    private cookieService: CookieStorageService,
  ) { }

  logout() {
    this.cookieService.eraseCookie('accessToken')
    this.cookieService.eraseCookie('refreshToken')
    localStorage.clear()
  }
}
