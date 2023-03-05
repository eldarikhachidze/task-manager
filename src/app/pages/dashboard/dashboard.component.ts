import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BoardService} from "../../core/services/board.service";
import * as url from "url";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$ = this.boardService.getBoards();
  boardId: number | null = null;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // this.route.url.subscribe( url => {
    //   this.boardId = +url[1].path
    // })
  }

}
