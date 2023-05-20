import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { IProductProducer } from "../common/product-producer.interface";
import { ITypeOfProductResponse } from "./type-of-product.interface";

export interface IFurnitureResponse{

  id: number;

  name: string;

  product_producer: IProductProducer | null;

  type_of_product: ITypeOfProductResponse;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  in_stock: InStockEnum;

  description: string,

  home_page: boolean,

  images: string[],

}