import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Column} from "../../../core/interfaces/board";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    issueTypeId: new FormControl(null, Validators.required),
    epicId: new FormControl(null, Validators.required),
    boardId: new FormControl(null, Validators.required),
    boardColumnId: new FormControl(null, Validators.required),
    isBacklog: new FormControl(true, Validators.required),
    priority: new FormControl(null, Validators.required),
    taskStatus: new FormControl(null, Validators.required),
    assigneeId: new FormControl(null, Validators.required),
    reporterId: new FormControl(null, Validators.required),
    taskProperty: new FormArray([]),
  })


  sub$ = new Subject()

  get taskProperty() {
    return this.form.get('taskProperty') as FormArray;
  }

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskAddEditComponent>,
    @inject(MAT_DIALOG_DATA) public data: { taskId: number, boardId: number, boardColumn: Column}
  ) {
  }

  ngOnInit(): void {
    if(this.data.taskId) {
      this.getTask(this.data.taskId)
    }
    if(this.data.boardId) {
      this.form.patchValue({boardId: this.data.boardId})
    }
    if(this.data.boardColumn) {
      this.form.patchValue({boardColumn: this.data.boardColumn.id})
    }
  }

  private getTask(taskId: number) {
    this.taskService.getTask(taskId)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.form.patchValue(res)
        res.taskProperty.forEach(property =>{
          this.taskProperty.push(new FormGroup({
            id: new FormControl(property.id),
            name: new FormControl(property.name, Validators.required),
            filedName: new FormControl(property.filedName, Validators.required),
            value: new FormControl(property.value, Validators.required),
            isRequired: new FormControl(property.isRequired, Validators.required),
          }))
        })
      })
  }

  save() {
    this.form.markAllAsTouched()
    if(this.form.invalid) return

    if(this.data.taskId){
      this.taskService.updateTask(this.data.taskId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
        this.dialogRef.close(res)
      })
    }else {
      this.taskService.createTask(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe( res => {
        this.dialogRef.close(res)
      })
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
