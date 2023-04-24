import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { StateEnum } from "../../enums/state.enum";
import { TypeOfProductEnum } from "../../enums/type-of-product.enum";

export interface IWindow{

  id: number;

  name: string;

  productProducerName: string;

  typeOfProduct: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  state: StateEnum;

  price: number;

  installationPrice: number;

  inStock: InStockEnum;

  profile: string[];

  construction: string[];

  glassUnit: string[];

  lamination: string[];

  glasses: string[];

  description?: string;

  home_page?: boolean;

  images: string[];
}