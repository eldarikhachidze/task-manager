import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

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
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.form.markAllAsTouched()
    if(this.form.invalid) return

    this.authService.login(this.form.value).subscribe(res => {
      console.log(res)
      this.router.navigate(['/'])
    })
  }
}
