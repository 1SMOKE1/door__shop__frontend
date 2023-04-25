import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/modules/share/services/validation.service';

@Component({
  selector: 'dsf-choose-door',
  templateUrl: './choose-door.component.html',
  styleUrls: ['./choose-door.component.scss']
})
export class ChooseDoorComponent {

  constructor(
    private readonly validationService: ValidationService
  ){}

  consultationForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', [
      Validators.required, 
      Validators.pattern(this.validationService.phonePattern())]),
  })

  public sendConsultationForm(){
    
  }
}
