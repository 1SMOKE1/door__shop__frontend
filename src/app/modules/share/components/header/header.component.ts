import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from '../order-basket/order-basket/order-basket.component';
import { OrderBasketService } from '../../services/order-basket.service';

@Component({
  selector: 'dsf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
    private readonly dialog: MatDialog,
    private readonly orderBasketService: OrderBasketService
  ){}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public toBasket(): void{
    this.dialog.open(
      OrderBasketComponent,
      this.orderBasketService.orderBasketConfig
    )
  }

  
}
