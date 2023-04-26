import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ICartLine } from '../../../interfaces/common/cart-line.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { OrderBasketService } from '../../../services/order-basket.service';
import { OrderBasketComponent } from '../order-basket/order-basket.component';

@Component({
  selector: 'dsf-order-basket-form',
  templateUrl: './order-basket-form.component.html',
  styleUrls: ['./order-basket-form.component.scss']
})
export class OrderBasketFormComponent{

  @Input() orderBasketRef: HTMLDivElement ;
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
    private readonly orderBasetkService: OrderBasketService
  ){}

  



  public scroll(el: HTMLElement | HTMLDivElement){
    this.orderBasetkService.scroll(el);
  }

  
}
