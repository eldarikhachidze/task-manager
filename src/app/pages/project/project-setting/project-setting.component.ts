import { Component } from '@angular/core';
import {Project} from "../../../core/interfaces/project";
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectFacade} from "../../../core/facades/project.service";

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})
export class ProjectSettingComponent {
  get project(): Project {
    return this.projectFacade.getProject()
  }
  constructor(

    private route: ActivatedRoute,
    private readonly projectFacade: ProjectFacade,
  ) {
  }
}
