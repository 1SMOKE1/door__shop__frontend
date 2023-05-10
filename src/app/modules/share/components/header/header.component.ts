import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from '../order-basket/order-basket/order-basket.component';


@Component({
  selector: 'dsf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  constructor(
    private readonly dialog: MatDialog
  ){}

  public toBasket(): void{
    this.dialog.open(
      OrderBasketComponent
    )
  }

  
}
