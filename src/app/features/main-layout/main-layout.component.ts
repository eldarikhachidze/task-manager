import {Component, OnInit} from '@angular/core';
import {Project} from "../../core/interfaces/project";
import {ProjectFacade} from "../../core/facades/project.service";
import {ProjectService} from "../../core/services/project.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  get project(): Project {
    return this.projectFacade.getProject()
  }

  bodyColor!: string;
  constructor(
    private readonly projectFacade: ProjectFacade,
    private projectService: ProjectService
  ) {

  }
  // getColorWithOpacity(color: string, opacity: number): string {
  //   // const rgbaColor = color.replace('#', '');
  //   const r = parseInt(rgbaColor.substring(0, 2), 16);
  //   const g = parseInt(rgbaColor.substring(2, 4), 16);
  //   const b = parseInt(rgbaColor.substring(4, 6), 16);
  //   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  // }

  ngOnInit(): void {
    this.projectService.getProject(this.project.id).subscribe(data=>{
      this.bodyColor = data.color
    })

  }

}
