import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ETaskStatus} from "../../../../../core/enums/etask-status.enum";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {BoardService} from "../../../../../core/services/board.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-board-add-edit',
  templateUrl: './board-add-edit.component.html',
  styleUrls: ['./board-add-edit.component.scss']
})
export class BoardAddEditComponent implements OnInit{
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    position: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    columns: new FormArray([], Validators.required),
  })
  taskStatuses = Object.values(ETaskStatus);

  boardId!: number;

  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }
  constructor(
    private boardService:BoardService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
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
  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.boardId) {
      this.boardService.createBoard(this.form.value)
        .subscribe( res => {
          this.router.navigate(['/projects/setting/boards']).then()
        })
    } else {
      this.boardService.createBoard(this.form.value)
        .subscribe( res => {
          this.router.navigate(['/projects/setting/boards']).then()
        })
    }


  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.columnsFormArray.controls, event.previousIndex, event.currentIndex);
    console.log(this.columnsFormArray.controls)
    this.columnsFormArray.controls.forEach((control, index) => {
      control.get('position')?.setValue(index + 1)
    })
  }

}
