import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartLineService } from '../../../services/cart-line.service';
import { IProduct } from '../../../interfaces/common/product.interface';
import { ICartLine } from '../../../interfaces/common/cart-line.interface';
import { OrderBasketService } from '../../../services/order-basket.service';

@Component({
  selector: 'dsf-order-basket',
  templateUrl: './order-basket.component.html',
  styleUrls: ['./order-basket.component.scss']
})
export class OrderBasketComponent{


  cartLines: ICartLine[] = [];
  sendForm: boolean = false;

  constructor(
    public readonly cartLineService: CartLineService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly orderBasketService: OrderBasketService
  ){}

 

  public scroll(el: HTMLElement): void{
    this.orderBasketService.scroll(el);
  }
  
  public decrease(id: number): void {
    this.cartLineService.decrease(id);
  }

  public increase(id: number): void {
    this.cartLineService.increase(id);
  }

  public clearCartLines(): void {
    this.cartLineService.clearCartLines();
  }

  public deleteCartLine(id: number): void {
    this.cartLineService.deleteCartLine(id);
  }

  public getTotal(): number {
    return this.cartLineService.getTotal();
  }

  public toCatalog(): void {
    this.dialog.closeAll();
    this.router.navigate(['store', 'catalog']);
  }

  public toCatalogAfterSubmit(): void {
    // this.sendForm = false;
    // this.goBackFromForm();
    this.cartLineService.clearCartLines();
    this.dialog.closeAll();
    this.router.navigate(['store', 'catalog']);
  }
}