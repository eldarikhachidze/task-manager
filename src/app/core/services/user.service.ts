import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";
import {User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BaseService{


  createUser(data: any) {
    return this.post('users', data);
  }

  getUsers(params = {}): Observable<PaginationResponse<User>> {
    return this.get('users', params);
  }


  getAllUsers(): Observable<any> {
    return this.get('users/all');
  }

  getUser(id: number): Observable<User> {
    return this.get(`users/${id}`);
  }

  updateUser(id: number, data: any) {
    return this.put(`users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.delete(`users/${id}`);
  }
}
