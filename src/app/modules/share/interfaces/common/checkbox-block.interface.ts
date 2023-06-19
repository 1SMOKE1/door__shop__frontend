import { TypeOfProductEnum } from "@modules/share/enums/type-of-product.enum";
import { IProductProducer } from "./product-producer.interface";

export interface ICheckBoxBlock{
  name: string,
  completed: boolean,
  typeOfProduct: TypeOfProductEnum
  subProductProducers: IProductProducer[]
}