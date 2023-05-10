import { IProductResponse } from "./product.interface";

export interface IGetProductsResponse{
  products: IProductResponse[],
  productsLength: number
}