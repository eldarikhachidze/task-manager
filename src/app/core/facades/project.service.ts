import { Injectable } from '@angular/core';
import {Project} from "../interfaces/project";
import {ProjectService} from "../services/project.service";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacade {
  myProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  myProjects$ = this.myProjects.asObservable()

  constructor(
    private projectService: ProjectService
  ) { }
  setProject(projectId: number) {
    this.projectService.getProject(projectId).subscribe(
      (project) => {
        localStorage.setItem('project', JSON.stringify(project))
      }
    )
  }
  getProject(): Project {
    const project = localStorage.getItem('project')
    return project ? JSON.parse(project) : null;
  }
  getMyProjects$(): Observable<Project[]> {
    return  this.projectService.getMyProjects()
      .pipe(
        tap(projects => this.myProjects.next(projects))
      )
  }
}
