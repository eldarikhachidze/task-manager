import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpResponse, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpUserEvent
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, of, switchMap, take, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string| null>=new  BehaviorSubject<string | null>(null)

  static addTokenToRequest(
    request: HttpRequest<any>,
    token : string|null
  ): HttpRequest<any>{
    if(token){
      return request.clone( {setHeaders: {Authorization: `bearer ${token}`}})
    }
    return  request;
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    |HttpResponse<any>
    | HttpUserEvent<any>
    | any {
    if(this.authService.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.token}`)
      })
    }
    return next.handle(request)
      .pipe(
      catchError( err=> {
        switch (err.status){
          case 401:
            return this.handle401Error(request, next);
        }

        const error=err.error.message || err.statusText;
        return throwError(error)
      })
    );
  }

  handle401Error(request: HttpRequest<unknown>, next:HttpHandler){
 if(!this.isRefreshingToken){
   this.isRefreshingToken= true;
   this.tokenSubject.next(null)
   return this.authService.refreshToken().pipe(
     switchMap((token: any)=> {
       if(token){
         this.tokenSubject.next(token.accessToken);
         return next.handle(AuthInterceptor.addTokenToRequest(request, token.accessToken))
       }
      this.authService.signOut()
       return of(false)

     }),
     catchError( err=>{
       this.authService.signOut()
       return of(false)
     }),
     finalize( ()=>{
       this.isRefreshingToken= false;
     }))
 }else{
   return this.tokenSubject.pipe(
     filter(token=> token !=null),
     take(1),
     switchMap(token=>{
       return next.handle(AuthInterceptor.addTokenToRequest(request,token))
     }), catchError( err=>{
       this.authService.signOut()
       return of(false)
     })

   )
 }
  }
}

