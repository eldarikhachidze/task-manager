import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {CookieStorageService} from "../../../../core/services/cookies.service";
import {map, switchMap, tap} from "rxjs";
import {LoginResponse} from "../../../../core/interfaces";
import {RoleService} from "../../../../core/services/role.service";

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
    private roleService: RoleService,
    private router: Router
  ) {
  }


  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value)
      .pipe(
        tap((res: LoginResponse) => {
          this.cookieStorageService.setCookie('accessToken', res.token.accessToken, 1);
          this.cookieStorageService.setCookie('refreshToken', res.token.refreshToken, 1);
          const roles = res.user.roles.map((r: any) => r.name);
          this.cookieStorageService.setCookie('roles', JSON.stringify(roles), 1);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        }),
        switchMap(() => this.roleService.getMyRoles()
          .pipe(
            map((res: any) => {
                const permissions: string[] = []
                const roles = res.forEach((r: any) => {
                  r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
                })
                localStorage.setItem('permissions', JSON.stringify(permissions));
              }
            )
          ),
        )
      )
      .subscribe()

  }

}
