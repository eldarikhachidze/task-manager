import { Injectable } from '@angular/core';
import { CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(
    private cookieService :CookieService
  ) { }

  setCookie(name:string, value: string, days?:number){
    this.cookieService.set(name, value, {

      path: '/',
      domain: `.${window.location.hostname}`,
      secure: true,
      sameSite: 'Strict',
    })

  }
  getCookie( name: string){
    return this.cookieService.get(name)

  }
  eraseCookie(name: string){
    this.cookieService.delete(name)
  }
  eraseAllCookies(){
    this.cookieService.deleteAll()
  }



}
