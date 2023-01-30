import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  post<t>(url: string, body: any): Observable<t> {
    return this.http.post<t>(this.apiUrl + url, body)
  }
}
