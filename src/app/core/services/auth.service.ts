import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Login, LoginResponse, Register, User} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  login(payload: Login): Observable<LoginResponse> {
    return this.post<LoginResponse>('auth/login', payload)
  }
  register(payload: Register): Observable<User> {
    return this.post<User>('auth/signup', payload)
  }
}
