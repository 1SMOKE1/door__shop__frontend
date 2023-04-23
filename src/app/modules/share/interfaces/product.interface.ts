import { CountryEnum } from "../enums/country.enum";
import { GuaranteeEnum } from "../enums/guarantee.enum";
import { InStockEnum } from "../enums/in-stock.enum";
import { StateEnum } from "../enums/state.enum";

export interface IProduct{
  id: number;
  typeOfProduct: string; // Тип продкута
  productProducer: string; // Производитель
  name: string, // Назва
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  state: StateEnum, // Стан
  price: number, // Ціна
  installationPrice: number, // Ціна з установкою
  inStock: InStockEnum, // На складі
  description?: string, // Опис
  amountOfSealingMaterials?: string | string[] | null, // Кількість ущільнюючих контурів
  fabricMaterial?: string | string[] | null, // Матеріл дверного полотна
  purpose?: string | string[] | null, // Призначення двері
  covering?: string | string[] | null, // Покриття
  frameMaterial?: string | string[] | null, // Матеріал дверної коробки
  profile?: string | string[] | null, // Профіль 
  construction?:  string | string[] | null, // Конструкція
  glassUnit?: string | string[] | null, // Стеклопакети
  lamination?: string | string [] | null, // Ламінація
  glasses?: string | string[] | null, // Стекла
  finishingTheSurface?: string |  string[] | null, // Оздоблення поверхні
  structuralFeatures?: string |  string[] | null, // Конструктивні особливості
  openingType?: string |  string[] | null, // Тип відкривання
  installationType?: string | string[] | null, // Тип монтажу
  openingMethod?: string | string[] | null, // Спосіб відкривання
  homePage?: boolean,
  images?: string[],
}