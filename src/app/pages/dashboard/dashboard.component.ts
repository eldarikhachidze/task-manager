import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BoardService} from "../../core/services/board.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  boards$ = this.boardService.getBoards();

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

  }

}
