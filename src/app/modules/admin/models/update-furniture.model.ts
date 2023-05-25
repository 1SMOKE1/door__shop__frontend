import { CountryEnum } from "../../share/enums/country.enum";
import { GuaranteeEnum } from "../../share/enums/guarantee.enum";
import { InStockEnum } from "../../share/enums/in-stock.enum";
import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";
import { IUpdateFurniture } from "../interfaces/update-furniture.interface";

export class UpdateFurnitureModel implements IUpdateFurniture{

  constructor(
    public id: number,

    public name: string,

    public productProducerName: string | null,

    public typeOfProductName: TypeOfProductEnum,

    public country: CountryEnum,

    public guarantee: GuaranteeEnum,

    public price: number,

    public inStock: InStockEnum,

    public description: string,

    public homePage: boolean,

    public images: string[]
  ){}

  

}