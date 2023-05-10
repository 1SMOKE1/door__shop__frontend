import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartLine } from '../../../interfaces/common/cart-line.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../services/common/validation.service';
import { ICreateOrder } from '../../../interfaces/common/order.interface';
import CreateOrderModel from '../../../models/create-order.model';
import { CartLineService } from '../../../services/common/cart-line.service';
import { OrderBasketService } from '../../../services/common/order-basket.service';
import { HandleFormsErrorService } from '../../../services/errors/handle-forms-error.service';

@Component({
  selector: 'dsf-order-basket-form',
  templateUrl: './order-basket-form.component.html',
  styleUrls: ['./order-basket-form.component.scss'],
})
export class OrderBasketFormComponent {
  @Output() sendFormEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() goBackEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() cartLines: ICartLine[] = [];

  constructor(
    private readonly validationService: ValidationService,
    private readonly cartLinesService: CartLineService,
    private readonly orderBasketService: OrderBasketService,
    private readonly handleFormsErrorService: HandleFormsErrorService
  ) {}

  orderForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.phonePattern()),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.emailPattern()),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    kindOfPayment: new FormControl(''),
  });

  public submit(e: Event) {
    const totalCost: number = this.cartLinesService.getTotal();
    const { name, phone, email, address, kindOfPayment }: ICreateOrder =
      this.orderForm.value;
    const newOrder: ICreateOrder = new CreateOrderModel(
      name,
      phone,
      email,
      address,
      this.cartLines,
      false,
      totalCost,
      kindOfPayment
    );

    this.orderBasketService.createOrder(newOrder)
    .subscribe({
      next: () => this.sendFormEmit.emit(e),
      error: (err: Error): void => this.handleFormsErrorService.snackbarShowError(err)  
      ,
    });
  }

  public goBack(e: Event): void {
    this.goBackEmit.emit(e);
  }
}
