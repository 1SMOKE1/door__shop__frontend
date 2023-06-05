import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { IConsultationFormResponse } from '@modules/store/interfaces/response/consultation-form.interface';
import { MainService } from '@modules/store/services/common/main.service';

@Component({
  selector: 'dsf-choose-door',
  templateUrl: './choose-door.component.html',
  styleUrls: ['./choose-door.component.scss']
})
export class ChooseDoorComponent {

  constructor(
    private readonly validationService: ValidationService,
    private readonly mainService: MainService,
    private readonly snackbarConfigService: SnackbarConfigService
  ){}

  consultationForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', [
      Validators.required, 
      Validators.pattern(this.validationService.phonePattern())]),
  })

  public sendConsultationForm(){
    this.mainService
      .sendConsultationForm(this.consultationForm.value)
      .subscribe({
        next: ({ name }: IConsultationFormResponse) => {
          this.consultationForm.reset();
          this.snackbarConfigService.openSnackBar(this.mainService.successForm(name));
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      });
  }
}
