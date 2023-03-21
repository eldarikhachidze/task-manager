import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BoardService} from "../../core/services/board.service";

import {Project} from "../../core/interfaces/project";
import {ProjectFacade} from "../../core/facades/project.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$ = this.boardService.getBoards();
  boardId: number | null = null;
  get project(): Project {
    return this.projectFacade.getProject()
  }

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private readonly projectFacade: ProjectFacade,
  ) {
  }

  ngOnInit(): void {
    // this.route.url.subscribe( url => {
    //   this.boardId = +url[1].path
    // })
  }

}
