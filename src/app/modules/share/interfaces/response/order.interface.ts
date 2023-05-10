import { kindOfPaymentEnum } from "../../enums/kind-of-payment";
import { ICartLine } from "../common/cart-line.interface";

export interface IOrderResponse{
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  cart_lines: JSON & ICartLine[] ;
  shiped: boolean;
  total_cost: number;
  kind_of_payment: kindOfPaymentEnum;
}