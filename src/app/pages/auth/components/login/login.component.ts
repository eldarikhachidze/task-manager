import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {CookieStorageService} from "../../../../core/services/cookies.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
  })

  constructor(
    private authService: AuthService,
    private cookieStorageService: CookieStorageService,
    private router: Router
  ) {
  }


  ngOnInit() {
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

   this.authService.login(this.form.value).subscribe((res) => {
      this.cookieStorageService.setCookie('accessToken', res.token.accessToken, 1)
      this.cookieStorageService.setCookie('refreshToken', res.token.refreshToken, 1)
     localStorage.setItem('user', JSON.stringify(res.user))
     this.router.navigate(['home'])
    })
  }

}
