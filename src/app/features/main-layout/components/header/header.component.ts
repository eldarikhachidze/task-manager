import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {AuthFacade} from "../../../../core/facades/auth.service";
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


  currentProject?: Project = this.projectFacade.getProject()
  projects$ = this.projectFacade.myProjects$;

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
    this.getMyProjects()
  }

  logout() {
    this.authFacade.logout()
    // localStorage.clear()
    // this.authService.signOut()
  }

  selectProject(projectId: any) {
    this.projectFacade.setProject(projectId)
  }
  getMyProjects() {
    this.projectFacade.getMyProjects$().subscribe()
  }
}
