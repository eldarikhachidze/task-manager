import { Injectable } from '@angular/core';
import {Project} from "../interfaces/project";
import {ProjectService} from "../services/project.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacade {

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
}
