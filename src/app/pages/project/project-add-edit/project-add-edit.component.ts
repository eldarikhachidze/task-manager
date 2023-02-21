import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../core/services/project.service";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {ProjectFacade} from "../../../core/facades/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.scss']
})
export class ProjectAddEditComponent implements OnDestroy{

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    abbreviation: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
  })

  sub$ = new Subject()

  constructor(
    private readonly projectService: ProjectService,
    private router: Router,
    private readonly projectFacade: ProjectFacade,
  ) {
  }

  save() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return

    this.projectService.createProject(this.form.value)
      .pipe(
        takeUntil(this.sub$),
        tap((res) => this.projectFacade.setProject(res.id)),
        switchMap( () => this.projectFacade.getMyProjects$())
      )
      .subscribe( res => {
        console.log(res)

        this.router.navigate(['/projects/setting']).then()
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }
}
