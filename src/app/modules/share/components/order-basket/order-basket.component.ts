import { Component } from '@angular/core';
import { ICartLine } from '../../interfaces/common/cart-line.interface';
import { CartLineService } from '../../services/cart-line.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'dsf-order-basket',
  templateUrl: './order-basket.component.html',
  styleUrls: ['./order-basket.component.scss'],
})
export class OrderBasketComponent {
  constructor(
    private readonly cartLineService: CartLineService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  cartLines: ICartLine[] = [];

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
    this.router.navigate(['/catalog']);
  }

  public toCatalogAfterSubmit(): void {
    // this.sendForm = false;
    // this.goBackFromForm();
    this.cartLineService.clearCartLines();
    this.dialog.closeAll();
    this.router.navigate(['catalog']);
  }
}
