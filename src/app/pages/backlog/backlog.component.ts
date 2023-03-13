import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../../shared/confirmation-popup/confirmation-popup.component";
import {TaskService} from "../../core/services/task.service";
import {TaskAddEditComponent} from "../../shared/task-add-edit/task-add-edit.component";

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, RouterModule, MatDialogModule,],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  displayedColumns = ['id', 'name', 'issueType', 'epic', 'createdAt', 'actions'];

  // dataSource = new MatTableDataSource<Task>();

  dataSource = new MatTableDataSource<Task>();
  sub$ = new Subject();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    this.getIssueTypes();
  }

  getIssueTypes() {
    this.taskService.getTasks({
      isBacklog: true
    })
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        // this.dataSource.data = boards
      })
  }

  addBoard() {
    console.log('add board');
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.taskService.deleteTask(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getIssueTypes();
        }
      });
  }

  addTask(taskId?: number) {
    const  dialogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1200px',
      data: {
        isBacklog: true,
        taskId,
      },
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.getIssueTypes()
      }
    })
  }
}
