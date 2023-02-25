import { Component } from '@angular/core';
import {ProjectFacade} from "../../../../core/facades/project.service";
import {Project} from "../../../../core/interfaces/project";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent {
  get project(): Project {
    return this.projectFacade.getProject()
  }
  constructor(
    private readonly projectFacade: ProjectFacade,

  ) {
  }


  editProject() {

  }
}
