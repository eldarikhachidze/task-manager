import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ETaskStatus} from "../../../../../core/enums/etask-status.enum";
import {BoardService} from "../../../../../core/services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {IssueTypeEnum} from "../../../../../core/enums/issue-type.enum";

@Component({
  selector: 'app-issue-type-add-edit',
  templateUrl: './issue-type-add-edit.component.html',
  styleUrls: ['./issue-type-add-edit.component.scss']
})
export class IssueTypeAddEditComponent implements OnInit{
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    icon: new FormControl(null, Validators.required),
    color: new FormControl(1, Validators.required),
    type: new FormControl(null, Validators.required),
    issueTypeColumns: new FormArray([], Validators.required),
  })
  issueTypes = Object.values(IssueTypeEnum);

  boardId!: number;

  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }
  constructor(
    private boardService:BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params['id']) {
        this.boardId = +params['id'];
        this.getBoard()
      }
    })
  }
  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(res => {
      this.form.patchValue(res)
      res.columns.forEach(column =>{
        this.columnsFormArray.push(new FormGroup({
          name: new FormControl(column.name, Validators.required),
          position: new FormControl(column.position, Validators.required),
          description: new FormControl(column.description, Validators.required),
          taskStatus: new FormControl(column.taskStatus, Validators.required),
        }, Validators.required))
      })
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
  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.boardId) {
      this.boardService.updateBoard(this.form.value)
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
