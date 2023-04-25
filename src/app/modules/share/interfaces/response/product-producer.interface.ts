import { ITypeOfProductResponse } from "./type-of-product.interface";

export interface IProductProducerResponse{
  
  id: number | null;

  name: string;

  type_of_product: ITypeOfProductResponse;


}