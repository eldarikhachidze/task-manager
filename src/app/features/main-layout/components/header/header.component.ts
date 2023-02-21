import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {AuthFacade} from "../../../../core/facades/auth.service";
import {Observable} from "rxjs";
import {Project} from "../../../../core/interfaces/project";
import {ProjectService} from "../../../../core/services/project.service";
import {ProjectFacade} from "../../../../core/facades/project.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  projects = []

  projects$: Observable<Project[]> = this.projectService.getMyProjects();
  currentProject?: Project = this.projectFacade.getProject()

  get isAuth(): boolean{
    return this.authFacade.isAuth;
  }
  get user(){
    return this.authService.user

  }
  constructor(
    private  authService: AuthService,
    private projectService: ProjectService,
    private projectFacade: ProjectFacade,
    private authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authFacade.logout()
  }

  selectProject(projectId: any) {
    console.log(projectId);
    this.projectFacade.setProject(projectId)
  }
}
