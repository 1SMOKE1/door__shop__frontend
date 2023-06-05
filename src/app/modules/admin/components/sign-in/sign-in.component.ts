import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { IAdminLoginForm } from '../../interfaces/admin-login-form.interface';
import { AuthService } from '../../services/auth.service';
import { ITokens } from '../../interfaces/ITokens';
import { HandleFormsErrorService } from '@modules/share/services/errors/handle-forms-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dsf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(
    private readonly validationService: ValidationService,
    private readonly authService: AuthService,
    private readonly handleFormsErrorService: HandleFormsErrorService,
    private readonly router: Router,
    
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
    .then((data: Response) => data.json())
    .then(({refresh_token, access_token}: ITokens) => {
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('access_token', access_token);
      this.router.navigate(['admin', 'main-panel']);
      this.adminForm.reset();
    }
    )
    .catch((err) => this.handleFormsErrorService.snackbarShowError(err));
  }
}
