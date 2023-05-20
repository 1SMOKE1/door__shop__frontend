import { IProductCaltulator } from "./product-calculator.interface";

export interface ICartLine{
  quantity: number;
  product: IProductCaltulator;

  get subTotal(): number;
  increase(): void;
  decrease(): void;
}