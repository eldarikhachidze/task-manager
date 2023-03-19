import {Component, OnInit} from '@angular/core';
import {Project} from "../../core/interfaces/project";
import {ProjectService} from "../../core/services/project.service";
import {ProjectFacade} from "../../core/facades/project.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects = []


  currentProject?: Project = this.projectFacade.getProject()
  projects$ = this.projectService.getAllProjects();
  constructor(
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
  ) { }

  ngOnInit(): void {
  }


}
