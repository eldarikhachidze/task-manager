import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl: string = environment.apiUrl
  http: HttpClient = inject(HttpClient)

  post<t>(url: string, body: any): Observable<t> {
    return this.http.post<t>(this.apiUrl + url, body)
  }
  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, {params: new HttpParams ({fromObject: params})})
  }

  delete<t>(url: string): Observable<t> {
    return this.http.delete<t>(this.apiUrl + url)
  }
  put<t>(url: string, body?: any): Observable<t> {
    return this.http.put<t>(this.apiUrl + url, body)
  }
}
