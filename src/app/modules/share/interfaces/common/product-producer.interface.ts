import { ITypeOfProductResponse } from "../response/type-of-product.interface";

export interface IProductProducer{
  id: number;
  name: string;
  typeOfProduct: ITypeOfProductResponse,
  completed?: boolean
}