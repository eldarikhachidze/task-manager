import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from "../../core/services/projects.service";
import {Project} from "../../core/interfaces/project";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  projects: Project[] = []
  sub$ = new Subject()
  constructor(
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.getProjects()
  }
  getProjects() {
    this.projectService.getProjects({})
      .pipe(takeUntil(this.sub$))
      .subscribe((projects) => {
        this.projects = projects
      })
  }
  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
