import { IProduct } from "./product.interface";

export interface ICartLine{
  quantity: number;
  product: IProduct;

  get subTotal(): number;
  increase(): void;
  decrease(): void;
}