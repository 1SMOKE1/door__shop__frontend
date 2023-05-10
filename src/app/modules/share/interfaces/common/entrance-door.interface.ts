import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { TypeOfProductEnum } from "../../enums/type-of-product.enum";

export interface IEntranceDoor{
  
  id: number;

  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  frameMaterialThickness?: string[] | null, // Товщина короба

  doorInsulation?: string[] | null // Утеплення

  covering?: string[] | null, // Оздоблення

  doorPeephole?: boolean, // Глазок

  openingType?: string[] | null, // Тип відкривання

  size?: string[] | null, // Розмір

  lowerLock?: string[] | null, // Нижній замок

  upperLock?: string[] | null, // Верхній замок

  weight?: string[] | null, // Вага

  metalThickness?: number, // Товщина металу

  frameMaterialConstruction?: string[] | null; // Конструкція короба
  
  sealerCircuit?: string[] | null; // Контур Ущільнення

  homePage?: boolean;

  images?: string[];

  description?: string;
}