import { kindOfPaymentEnum } from "../../enums/kind-of-payment";
import { ICartLine } from "./cart-line.interface";

export interface ICreateOrder{
  id?: number
  name: string,
  phone: string,
  email: string,
  address: string,
  cartLines: ICartLine[],
  shiped: boolean,
  totalCost: number,
  kindOfPayment: kindOfPaymentEnum,
}