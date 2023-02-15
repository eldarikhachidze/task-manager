import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../../core/services/project.service";
import {Observable} from "rxjs";
import {Project} from "../../core/interfaces/project";
import {ProjectFacade} from "../../core/facades/project.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects = []

  projects$: Observable<Project[]> = this.projectService.getAllProjects();
  currentProject?: Project = this.projectFacade.getProject()
  constructor(
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
  ) { }

  ngOnInit(): void {
  }

  selectProject(projectId: any) {
    console.log(projectId);
    this.projectFacade.setProject(projectId)
  }
}
