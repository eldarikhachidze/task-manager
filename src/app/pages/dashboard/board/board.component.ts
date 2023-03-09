import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Board, Column} from "../../../core/interfaces/board";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskAddEditComponent} from "../task-add-edit/task-add-edit.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId!: number;
  board: Board = {} as Board;
  tasks: any = {
    15: [
      {
        id: 1,
        title: 'task 1',
      },
      {
        id: 2,
        title: 'task 2',
      },
      {
        id: 3,
        title: 'task 3',
      }
    ],
    16: [],
    17: [],
    18: [],
    19: [],
  };

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id']
        this.getBoard()
      }
    })
  }

  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(board => {
      console.log(board)
      this.board = board
    })
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // viewTask(task: any, column: Column) {
  // }

  addTask(column: Column) {
    this.dialog.open(TaskAddEditComponent, {
      width: '1200px',
      data: {
        boardId: this.boardId,
        column: column
      }
    })
  }
}
