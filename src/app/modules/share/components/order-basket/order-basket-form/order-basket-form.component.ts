import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartLine } from '../../../interfaces/common/cart-line.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '@share-services/validation.service';
import { ICreateOrder } from '../../../interfaces/common/order.interface';
import CreateOrderModel from '../../../models/create-order.model';
import { CartLineService } from '../../../services/cart-line.service';
import { OrderBasketService } from '@share-services/order-basket.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderBasketSubmitEnum } from '../../../enums/order-basket-submit.enum';
import { SpinnerService } from '@share-services/spinner.service';
import { delay, interval, map } from 'rxjs';

@Component({
  selector: 'dsf-order-basket-form',
  templateUrl: './order-basket-form.component.html',
  styleUrls: ['./order-basket-form.component.scss'],
})
export class OrderBasketFormComponent implements OnInit{
  @Output() sendFormEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() goBackEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() cartLines: ICartLine[] = [];

  constructor(
    private readonly validationService: ValidationService,
    private readonly cartLinesService: CartLineService,
    private readonly orderBasketService: OrderBasketService,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly spinnerService: SpinnerService
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

  ngOnInit(): void {
    this.orderBasketService.submitingOrderSubject.next(OrderBasketSubmitEnum.noSubmit);
  }

  public submit() {
    this.spinnerService.spinnerSubscription = interval(10)
    .subscribe((value: number) => {
      this.spinnerService.spinnerValue += value;
    })
    this.orderBasketService.submitingOrderSubject.next(OrderBasketSubmitEnum.loading);
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
      next: () => {
        this.orderBasketService.submitingOrderSubject.next(OrderBasketSubmitEnum.success);
        this.spinnerService.spinnerValue = 0;
        this.spinnerService.spinnerSubscription.unsubscribe();
      },
      error: (err: HttpErrorResponse): void => {
        this.snackbarConfigService.showError(err);
        this.spinnerService.spinnerValue = 0;
        this.orderBasketService.submitingOrderSubject.next(OrderBasketSubmitEnum.noSubmit);
        this.spinnerService.spinnerSubscription.unsubscribe();
      }  
    });
  }

  public goBack(e: Event): void {
    this.goBackEmit.emit(e);
  }
}
