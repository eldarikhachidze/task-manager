import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Board, Column} from "../../../core/interfaces/board";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskService} from "../../../core/services/task.service";

import * as _ from 'lodash'
import {Task} from "../../../core/interfaces/task";
import {TaskAddEditComponent} from "../../../shared/task-add-edit/task-add-edit.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ETaskStatus} from "../../../core/enums/etask-status.enum";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    position: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    columns: new FormArray([], Validators.required),
  })
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
    private taskService: TaskService,
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
      this.getTasks()
    })
  }

  drop(event: CdkDragDrop<any>, column: Column) {
    console.log(event.container)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const tasks: Task[] = event.container.data.map((task: Task, index: number) => {
        return {
          ...task,
          taskStatus: column.taskStatus,
          boardColumnId: column.id,
        }
      })

      this.tasks[column.id] = tasks
      const currentTask = tasks[event.currentIndex]
      console.log(currentTask)
      this.taskService.updateTask(currentTask.id, currentTask).subscribe(task => {

        console.log(task)
        this.getTasks()
      })
    }


  }
  addTask(column: Column) {
    const  dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1200px',
      data: {
        boardId: this.boardId,
        column: column
      },
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.getTasks()
      }
    })
  }

  private getTasks() {
    this.taskService.getTasks({boardId: this.boardId}).subscribe(tasks => {
      this.tasks = _.groupBy(tasks, 'boardColumnId')
    })
  }

  viewTask(task: Task, column: Column) {
    const  dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1000px',
      data: {
        boardId: this.boardId,
        column: column,
        taskId: task.id
      },
    });
    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.getTasks()
      }
    })
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(this.columnsFormArray.length + 1, Validators.required),
      taskStatus: new FormControl(ETaskStatus.ToDo, Validators.required)
    }, Validators.required));
  }
}
