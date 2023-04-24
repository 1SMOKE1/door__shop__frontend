import { ITypeOfProductResponse } from "../response/type-of-product.interface";

export interface IProductProducer{
  id: number | null;
  name: string;
  typeOfProduct: ITypeOfProductResponse,
}