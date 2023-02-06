import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Project} from "../interfaces/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService{

  getProjects(params: {}): Observable<Project[]> {
    return this.get<Project[]>('project', params)
  }
}
