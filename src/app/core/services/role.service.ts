import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {PaginationResponse} from "../interfaces/pagination-response";
import {Observable} from "rxjs";
import {Role} from "../interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {



  getRoles(params = {}): Observable<PaginationResponse<Role>> {
    return this.get('role', params);
  }
  getAllRoles(): Observable<Role[]> {
    return this.get('role/all');
  }

  getRole(id: string): Observable<any> {
    return this.get(`role/${id}`);
  }

  createRole(role: Role) {
    return this.post('role', role);
  }

  updateRole(role: Role) {
    return this.put(`role/${role.id}`, role);
  }

  deleteRole(id: number) {
    return this.delete(`role/${id}`);
  }

  getPermissions(): Observable<any[]> {
    return this.get('role/permission');
  }

  setPermissions(params: {
    roleId: string, permissions: number[]
  }): Observable<any> {
    return this.post(`role/permissions`, params);
  }

  getMyRoles(): Observable<any> {
    return this.get(`role/my`);
  }
}
