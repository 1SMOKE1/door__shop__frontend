import { ICartLine } from "../interfaces/common/cart-line.interface";
import { IProduct } from "../interfaces/common/product.interface";

export class CartLine implements ICartLine{

  public quantity: number = 1;

  constructor(
    public product: IProduct,
  ){}

  get subTotal(): number{
    return this.product!.price * this.quantity;
  }

  public increase(): void{
    ++this.quantity
  }

  public decrease(): void{
    if(this.quantity >= 2){
      --this.quantity;
    }
  }
}