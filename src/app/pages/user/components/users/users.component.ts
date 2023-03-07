import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../core/services/user.service";
import {Subject} from "rxjs";
import {UserAddEditComponent} from "../user-add-edit/user-add-edit.component";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../../core/interfaces";
import {ConfirPopUpComponent} from "../../../../shared/confir-pop-up/confir-pop-up.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<User>();

  sub$ = new Subject();
  pageIndex  = 1;
  total = 0;
  pageSize = 10;


  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers({
      page: this.pageIndex,
      limit: this.pageSize
    })
      .subscribe(users => {
        this.dataSource.data = users.data;
        this.total = users.totalCount;
      });
  }


  addUser(id?: number) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      data: {
        userId: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    })

  }


 // delete(id: number){
 //    const dialogRef = this.dialog.open(ConfirPopUpComponent);
 //    dialogRef.afterClosed()
 //      .pipe(
 //      takeUntil(this.sub$),
 //      switchMap((result) =>{
 //        if(result) {
 //          return this.userService.deleteUser(id);
 //        } return of(null)
 //      } )
 //    ) .subscribe( result=>{
 //      if (result){
 //        this.getUsers();
 //      }
 //    });
 // }
  pageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getUsers()
  }

  // setRole(user: User) {
  //   const dialogRef = this.dialog.open(UserRoleComponent, {
  //     data: {
  //       user: user,
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.getUsers();
  //     }
  //   })
  // }
}
