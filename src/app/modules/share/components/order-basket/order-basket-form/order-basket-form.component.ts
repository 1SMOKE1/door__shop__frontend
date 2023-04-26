import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartLine } from '../../../interfaces/common/cart-line.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'dsf-order-basket-form',
  templateUrl: './order-basket-form.component.html',
  styleUrls: ['./order-basket-form.component.scss']
})
export class OrderBasketFormComponent{
  @Output()sendFormEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Output()goBackEmit: EventEmitter<Event> = new EventEmitter<Event>();
  // @Input() orderBasketRef: HTMLDivElement ;
  @Input() cartLines: ICartLine[] = [];

  orderForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    'phone': new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.phonePattern())
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.emailPattern())
    ]),
    'address': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'kindOfPayvment': new FormControl('')
  })

  constructor(
    private readonly validationService: ValidationService,
  ){}

  


  goBack(e: Event): void{
    this.goBackEmit.emit(e);
  }

  
}
