import { productMultiType } from "../../types/product.type";
import { IProduct } from "./product.interface";

export interface IGetProducts {
  products: productMultiType[] & IProduct[];
  productsLength: number;
}