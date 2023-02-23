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
  getMyProjects(): Observable<Project[]> {
    return this.get<Project[]>('project/my')
  }
  getProject(id: number): Observable<Project> {
    return this.get<Project>(`project/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.post<Project>('project', project)
  }
  updateProject(project: Project): Observable<Project> {
    return this.put<Project>(`project/${project.id}`, project)
  }
  deleteProject(id: number): Observable<any> {
    return this.delete(`project/${id}`)
  }
  getProjectUsers(): Observable<any> {
    return this.get(`project/users`);
  }

  addProjectUser( data: {
    projectId: number,
    userIds: number[]
  }): Observable<any> {
    return this.post(`project/users`, data);
  }
}
