import { Injectable } from '@angular/core';
import { ICartLine } from '../interfaces/common/cart-line.interface';
import { CartLine } from '../models/cart-line.model';
import { IProduct } from '../interfaces/common/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartLineService{

  public cartLines: ICartLine[] = [];
  constructor() {}

  public getCartLines(): ICartLine[]{
    return this.cartLines
  }

  public addCartLine(product: IProduct): void{
    if(this.hasCartLine(product.id)){
      this.increase(product.id);
    } else {
      this.cartLines.push(new CartLine(product));
    }
  }

  public increase(id: number): void{
    if(this.hasCartLine(id))
    this.getCartLine(id).increase()
  }

  public decrease(id: number): void{
    if(this.hasCartLine(id))
    this.getCartLine(id).decrease();
  }

  public getTotal(): number{
    return this.cartLines.reduce((acc, line) => acc + line.subTotal, 0)
  }

  public deleteCartLine(id: number): void{
    if(this.hasCartLine(id))
    this.cartLines = this.cartLines
    .filter((el: CartLine) => el.product.id !== id);
  }

  private getCartLine(id: number): CartLine{
    const cartLine = this.locator(id);
    if(cartLine){
      return cartLine
    } else {
      throw new Error(`not Found CardLine with - ${id} id`)
    }
  }

  private hasCartLine(id: number): boolean{
    return !!this.locator(id)
  }

  private locator(id: number): CartLine | undefined{
    return this.cartLines.find((line: CartLine) => line.product.id === id)
  }

  public clearCartLines(): void{
    this.cartLines = [];
  }
}
