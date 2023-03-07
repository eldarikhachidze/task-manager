import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../../../../../shared/confirmation-popup/confirmation-popup.component";
import {EpicService} from "../../../../../core/services/epic.service";
import {Epic} from "../../../../../core/interfaces/epik";

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss']
})
export class ProjectEpicsComponent {
  displayedColumns = ['id', 'name', 'createdAt', 'actions',];
  dataSource = new MatTableDataSource<Epic>();
  sub$ = new Subject()

  constructor(
    private epicService: EpicService,
    public dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.getEpics();
  }

  getEpics() {
    this.epicService.getEpics()
      .pipe(takeUntil(this.sub$))
      .subscribe(epics => {
        this.dataSource.data = epics;
      });
  }
  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }


  deleteEpic(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if(result) {
            return this.epicService.deleteEpic(id)
          }
          return of(null)
        })
      )
      .subscribe(result => {
        if(result) {
          this.getEpics()
        }
      })
  }
}
