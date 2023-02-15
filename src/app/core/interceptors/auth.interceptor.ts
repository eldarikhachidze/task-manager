import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../interfaces";
import {CookieStorageService} from "../services/cookies.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  private accessToken: string | undefined = undefined

  static addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `bearer ${token}`
      }
    })
  }

  constructor(
    private authService: AuthService,
    private cookieService: CookieStorageService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.cookieService.getCookie('accessToken');
    if (!accessToken) {
      return next.handle(request)
    }
    return next.handle(AuthInterceptor.addToken(request, accessToken))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            return this.handle401Error(request, next);
          }
          return throwError(err)
        })
      );
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null)
      const refreshToken = this.cookieService.getCookie('refreshToken');
      if (!refreshToken) {
        this.cookieService.eraseCookie('accessToken');
        this.cookieService.eraseCookie('refreshToken');
        return throwError(() => {
          return new Error('Refresh token not found');
        });
      }
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap((token: LoginResponse) => {
          this.isRefreshingToken = false
          this.tokenSubject.next(token.token.accessToken)
          this.accessToken = token.token.accessToken
          return next.handle(AuthInterceptor.addToken(request, token.token.accessToken))

        }),
        catchError(err => {
          this.cookieService.eraseCookie('accessToken');
          this.cookieService.eraseCookie('refreshToken');
          this.isRefreshingToken = false
          return throwError(() => err)
        }),
      )
    }
    return this.tokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token: string) => {
        return next.handle(AuthInterceptor.addToken(request, token))
      }),
    )
  }
}
