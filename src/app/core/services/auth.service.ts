import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Login, LoginResponse, Register, User} from "../interfaces";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  get token(): string | null {
    return localStorage.getItem('token')
  }

  get user(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null
  }
  login (payload: Login): Observable<LoginResponse> {
    return this.post<LoginResponse>('auth/login', payload)
      .pipe(
        tap((response: LoginResponse) => {
            this.setToken(response.token.accessToken);
            this.setUser(response.user);
          }
        )
      )
  }

  register (payload: Register): Observable<User> {
    return this.post<User>('auth/signup', payload)
  }
  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.post( 'auth/refresh',  {refreshToken})
  }
  checkEmail(email: any) {
    return this.post('auth/checkEmail', {email})
  }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }
  signOut() {
    localStorage.clear();

  }
}

