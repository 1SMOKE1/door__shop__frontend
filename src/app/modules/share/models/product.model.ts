import { CountryEnum } from "../enums/country.enum";
import { GuaranteeEnum } from "../enums/guarantee.enum";
import { InStockEnum } from "../enums/in-stock.enum";
import { StateEnum } from "../enums/state.enum";
import { IProductProducer } from "../interfaces/common/product-producer.interface";
import { IProduct } from "../interfaces/common/product.interface";
import { ITypeOfProductResponse } from "../interfaces/response/type-of-product.interface";

export class ProductModel implements IProduct{

  constructor(
    public id: number,
    public productProducer: IProductProducer | null,
    public typeOfProduct: ITypeOfProductResponse,
    public name: string,
    public country: CountryEnum,
    public guarantee: GuaranteeEnum,
    public state: StateEnum,
    public price: number,
    public installationPrice: number,
    public inStock: InStockEnum,
    public description?: string,
    public amountOfSealingMaterials?: string[] | null,
    public fabricMaterial?: string[] | null,
    public purpose?: string[] | null,
    public covering?: string[] | null,
    public frameMaterial?: string[] | null,
    public profile?: string[] | null,
    public construction?: string[] | null,
    public glassUnit?: string[] | null,
    public lamination?: string[] | null,
    public glasses?: string[] | null,
    public finishingTheSurface?: string[] | null,
    public structuralFeatures?: string[] | null,
    public openingType?: string[] | null,
    public installationType?: string[] | null,
    public openingMethod?: string[] | null,
    public homePage?: boolean,
    public images?: string[],
  ){}
  
}