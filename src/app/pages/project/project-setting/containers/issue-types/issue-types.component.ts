import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../../../../../shared/confirmation-popup/confirmation-popup.component";
import {IIssueType} from "../../../../../core/interfaces/issue-type";
import {IssueTypeService} from "../../../../../core/services/issue-type.service";

@Component({
  selector: 'app-issue-types',
  templateUrl: './issue-types.component.html',
  styleUrls: ['./issue-types.component.scss']
})
export class IssueTypesComponent {
  displayedColumns = ['id', 'name', 'createdAt', 'actions',];
  dataSource = new MatTableDataSource<IIssueType>();
  sub$ = new Subject()

  constructor(
    private issueTypeService: IssueTypeService,
    public dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.getIssueTypes();
  }

  getIssueTypes() {
    this.issueTypeService.getIssueTypes()
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        this.dataSource.data = boards;
      });
  }

  addBoard() {
    console.log('add board')
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }


  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if(result) {
            return this.issueTypeService.deleteIssueType(id)
          }
          return of(null)
        })
      )
      .subscribe(result => {
        if(result) {
          this.getIssueTypes()
        }
      })
  }
}
