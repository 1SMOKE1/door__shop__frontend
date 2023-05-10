import { kindOfPaymentEnum } from "../enums/kind-of-payment";
import { ICartLine } from "../interfaces/common/cart-line.interface";
import { ICreateOrder } from "../interfaces/common/order.interface";

export class CreateOrderModel implements ICreateOrder{

  constructor(
    public name: string,
    public phone: string,
    public email: string,
    public address: string,
    public cartLines: ICartLine[],
    public shiped: boolean,
    public totalCost: number,
    public kindOfPayment: kindOfPaymentEnum,
    public id?: number
  ){}
}

export default CreateOrderModel;