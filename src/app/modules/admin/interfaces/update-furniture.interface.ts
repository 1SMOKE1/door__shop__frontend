import { CountryEnum } from "../../share/enums/country.enum";
import { GuaranteeEnum } from "../../share/enums/guarantee.enum";
import { InStockEnum } from "../../share/enums/in-stock.enum";
import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";

export interface IUpdateFurniture{
  id: number;

  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  description: string;

  homePage: boolean;

  images: string[];
}