import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class BaseService {
  apiUrl: string = environment.apiUrl
  http: HttpClient = inject(HttpClient)

  post<T>(url: string, params: {}): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, params)
  }
  get<T>(url: string, params= {}): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, {
      params: params
    })
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url)
  }
  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, data)
  }
}
