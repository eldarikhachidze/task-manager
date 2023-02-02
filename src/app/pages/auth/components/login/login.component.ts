import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {CookieStorageService} from "../../../../core/services/cookies.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private authService: AuthService,
    private cookie: CookieStorageService,
    private router: Router
  ) {
  }


  ngOnInit() {
    // this.cookie.setCookie('Test', '');
  }

  // getCookie() {
  //   const value: string = this.cookie.getCookie('Test');
  //   console.log(value);
  // }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.authService.login(this.form.value).subscribe(res => {
      console.log(res)
      this.router.navigate(['/home'])
    })
  }
}
