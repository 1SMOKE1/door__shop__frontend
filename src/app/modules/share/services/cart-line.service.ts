import { Injectable } from '@angular/core';
import { ICartLine } from '../interfaces/common/cart-line.interface';
import { CartLine } from '../models/cart-line.model';
import { IProductCaltulator } from '../interfaces/common/product-calculator.interface';

@Injectable({
  providedIn: 'root',
})
export class CartLineService {
  public cartLines: ICartLine[] = [];

  public getCartLines(): ICartLine[] {
    return this.cartLines;
  }

  public addCartLine(product: IProductCaltulator): void {
    if (this.hasCartLine(product)) {
      this.increase(product);
    } else {
      this.cartLines.push(new CartLine(product));
    }
  }

  public increase(product: IProductCaltulator): void {
    if (this.hasCartLine(product)) this.getCartLine(product).increase();
  }

  public decrease(product: IProductCaltulator): void {
    if (this.hasCartLine(product)) this.getCartLine(product).decrease();
  }

  public getTotal(): number {
    return this.cartLines.reduce((acc, line) => acc + line.subTotal, 0);
  }

  public deleteCartLine(product: IProductCaltulator): void {
    if (this.hasCartLine(product))
      this.cartLines = this.cartLines.filter(
        (el: CartLine) => el.product !== product
      );
  }

  private getCartLine(product: IProductCaltulator): CartLine {
    const cartLine = this.locator(product);
    if (cartLine) {
      return cartLine;
    } else {
      throw new Error(`not Found CardLine with - ${product.id} id`);
    }
  }

  private hasCartLine(product: IProductCaltulator): boolean {
    return !!this.locator(product);
  }

  private locator(product: IProductCaltulator): CartLine | undefined {
    return this.checkProductFields(product);
  }

  public clearCartLines(): void {
    this.cartLines = [];
  }

  private checkProductFields(product: IProductCaltulator): CartLine | undefined{
    return this.cartLines.find((line: CartLine) => JSON.stringify(line.product)===JSON.stringify(product))
  }
}
