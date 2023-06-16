import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICreateOrder } from '@modules/share/interfaces/common/order.interface';
import CreateOrderModel from '@modules/share/models/create-order.model';
import { OrderBasketService } from '@share-services/order-basket.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { OrderEnum } from '../../enums/order.enum';
import { map } from 'rxjs';
import { ConvertingOrderFieldsClass } from '../../utils/converting-order-fields.class';



@Component({
  selector: 'dsf-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent extends ConvertingOrderFieldsClass implements OnInit{

  orderItems: ICreateOrder[] = [];

  constructor(
    private readonly ordersService: OrderBasketService,
    private readonly snackbarConfigService: SnackbarConfigService
  ){
    super();
  }

  ngOnInit(): void {
    this.initOrderItems();

  }

  public confirmOrder(order: ICreateOrder): void{
    const {id, name, phone, address, email, cartLines, shiped, totalCost, kindOfPayment } = order
    const confirmedOrder: ICreateOrder = new CreateOrderModel(
      name,
      phone, 
      email,
      address,
      cartLines,
      !shiped,
      totalCost,
      kindOfPayment,
      id
    )
    this.ordersService.
      compliteOrder(confirmedOrder)
      .subscribe({
        next: ({id, name, phone, address, email, cartLines, shiped, totalCost, kindOfPayment }: ICreateOrder) => {
          this.orderItems = this.orderItems.map((el) => 
          el.id === id
          ? {...el, name, phone, address, email, cartLines, shiped, totalCost, kindOfPayment}
          : el)
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
      
  }

  
  public toggleOrderType(val: string): void{
    switch(val){
      case OrderEnum.all: 
        this.initOrderItems();
        break;
      case OrderEnum.open:
        this.getShipedOrders(false);
        break;
      case OrderEnum.close:
        this.getShipedOrders(true);
        break;
      default: 
        this.initOrderItems();
        break;
    }
  }

  public deleteOrder(id: number | undefined){
    if(id)
      this.ordersService
      .deleteOrder(id)
      .subscribe({
        next: (answer: string) => this.snackbarConfigService.openSnackBar(answer),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
    

  }

  private initOrderItems(): void{
    this.ordersService
    .getOrders()
    .subscribe({
      next: (orders: ICreateOrder[]) => this.orderItems = orders,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private getShipedOrders(condition: boolean){
    this.ordersService
    .getOrders()
    .pipe(
      map((el: ICreateOrder[]) => el.filter((el: ICreateOrder): boolean => el.shiped === condition))
    )
    .subscribe({
      next: (orders: ICreateOrder[]) => this.orderItems = orders,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }


}
