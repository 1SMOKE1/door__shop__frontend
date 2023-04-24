import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { StateEnum } from "../../enums/state.enum";
import { ITypeOfProductResponse } from "../response/type-of-product.interface";
import { IProductProducer } from "./product-producer.interface";

export interface IProduct{
  id: number;
  typeOfProduct: ITypeOfProductResponse; // Тип продкута
  productProducer: IProductProducer | null; // Производитель
  name: string, // Назва
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  state: StateEnum, // Стан
  price: number, // Ціна
  installationPrice: number, // Ціна з установкою
  inStock: InStockEnum, // На складі
  description?: string, // Опис
  amountOfSealingMaterials?: string[] | null, // Кількість ущільнюючих контурів
  fabricMaterial?: string[] | null, // Матеріл дверного полотна
  purpose?: string[] | null, // Призначення двері
  covering?: string[] | null, // Покриття
  frameMaterial?: string[] | null, // Матеріал дверної коробки
  profile?: string[] | null, // Профіль 
  construction?:  string[] | null, // Конструкція
  glassUnit?: string[] | null, // Стеклопакети
  lamination?: string [] | null, // Ламінація
  glasses?: string[] | null, // Стекла
  finishingTheSurface?:  string[] | null, // Оздоблення поверхні
  structuralFeatures?: string[] | null, // Конструктивні особливості
  openingType?:  string[] | null, // Тип відкривання
  installationType?: string[] | null, // Тип монтажу
  openingMethod?: string[] | null, // Спосіб відкривання
  homePage?: boolean,
  images?: string[],
}