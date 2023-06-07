import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { IAdminLoginForm } from '../../interfaces/admin-login-form.interface';
import { AuthService } from '../../services/auth.service';
import { ITokens } from '../../interfaces/ITokens';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';

@Component({
  selector: 'dsf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent{

  constructor(
    private readonly validationService: ValidationService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarConfigService:  SnackbarConfigService
  ){}


  adminForm: FormGroup<IAdminLoginForm> = new FormGroup({
    'email': new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.emailPattern()
      )
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.passwordPattern()
      )
    ])
  })

  signIn(){
    this.authService
    .signIn(this.adminForm.value)
    .then((data: Response | void) => data ? data.json() : undefined)
    .then(({refresh_token, access_token}: ITokens) => {
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('access_token', access_token);
      this.router.navigate(['admin', 'main-panel']);
      this.adminForm.reset();
    })
    .catch((err: HttpErrorResponse) => this.snackbarConfigService.showError(err));
  }
}
