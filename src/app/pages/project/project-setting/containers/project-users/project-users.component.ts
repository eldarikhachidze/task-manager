import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../../../core/services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../../core/services/project.service";
import {ProjectFacade} from "../../../../../core/facades/project.service";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserAddEditComponent} from "../../../../user/components/user-add-edit/user-add-edit.component";
import {User} from "../../../../../core/interfaces";
import {Board} from "../../../../../core/interfaces/board";



@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'firstName', 'lastName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<Board>();

  sub$ = new Subject();

  projectUserIds: number[] = [];

  chooseUserActive = false;
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(null, [Validators.required])
  });

  users$: Observable<User[]> = this.userService.getAllUsers();

  get projectId() {
    return this.projectFacade.getProject().id;
  }

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private projectFacade: ProjectFacade,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getProjectUsers()
  }

  getProjectUsers() {
    this.projectService.getProjectUsers()
      .pipe(takeUntil(this.sub$))
      .subscribe(users => {
        this.projectUserIds  = users.map((user: User) => user.id);
        this.dataSource.data = users;
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }


  delete(id: number) {
    const userIds = this.projectUserIds.filter((userId: number) => userId !== id);

    this.projectService.addProjectUser({
      projectId: this.projectId,
      userIds
    })
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.getProjectUsers();
      })
  }

  chooseUser() {
    this.chooseUserActive = !this.chooseUserActive;
  }

  onSubmit() {
    const userIds = [...this.projectUserIds, this.userForm.value.userId];
    this.createUsers(userIds)
      .subscribe(() => {
        this.getProjectUsers();
        this.chooseUser();
      })

  }

  createUsers(userIds: number[]) {
    return  this.projectService.addProjectUser({
      projectId: this.projectId,
      userIds
    })
      .pipe(takeUntil(this.sub$))

  }

  addNewUser() {
    const dialog = this.dialog.open(UserAddEditComponent);

    dialog.afterClosed()
      .pipe()
      .subscribe((result: User) => {

        if (result) {
          const userIds = [...this.projectUserIds, result.id];
          this.createUsers(userIds)
            .subscribe(() => {
              this.getProjectUsers();
              this.chooseUserActive = false;
            })
        }
      })
  }
}
