import { Component } from '@angular/core';
import {BoardService} from "../../../../core/services/board.service";
import {Observable} from "rxjs";
import {Board} from "../../../../core/interfaces/board";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {
  boards$: Observable<Board[]> = this.boardService.getBoards()
  displayedColumns = ['id', 'name', 'description', 'createdAd'];

  constructor(
    private boardService: BoardService
  ) {
  }

  addBoard() {
    console.log('add board')
  }
}
