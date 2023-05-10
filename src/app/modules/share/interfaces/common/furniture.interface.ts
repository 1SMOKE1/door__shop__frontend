import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { TypeOfProductEnum } from "../../enums/type-of-product.enum";

export interface IFurniture{
  id: number;

  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  description?: string;

  home_page?: boolean;

  images: string[];
}