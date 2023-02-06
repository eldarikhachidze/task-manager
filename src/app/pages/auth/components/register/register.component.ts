import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new UntypedFormControl(null, Validators.required),
  }, {validators: this.ConfirmedValidator('password', 'confirmPassword')})

  constructor(
    private  authService: AuthService,
    private router: Router
  ) { }

  get f():any {
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  ConfirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null)
      }
    }
  }


  submit() {
    this.form.markAllAsTouched()
    if(this.form.invalid) return

    console.log(this.form.value)

    this.authService.register(this.form.value).subscribe(res => {
      console.log(res)
      this.router.navigate(['auth/login'])
    })
  }
}
