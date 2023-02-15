import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";
import {Project} from "../interfaces/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

  getProjects(): Observable<PaginationResponse<Project>> {
    return this.get<PaginationResponse<Project>>('project')
  }
  getAllProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/all')
  }
  getProject(id: number): Observable<Project> {
    return this.get<Project>(`project/${id}`);
  }
}
