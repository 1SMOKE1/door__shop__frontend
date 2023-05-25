import { CountryEnum } from "../../share/enums/country.enum";
import { GuaranteeEnum } from "../../share/enums/guarantee.enum";
import { InStockEnum } from "../../share/enums/in-stock.enum";
import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";
import { ICalculatorChar } from "./calculator-char.interface";

export interface IUpdateEntranceDoor{

  id: number;

  name: string;

  productProducerName: null | string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  fabricMaterialThickness: number, // Товщина полотна 

  frameMaterialThickness: number, // Товщина короба

  doorInsulation: ICalculatorChar[], // Утеплення

  covering: ICalculatorChar[], // Оздоблення

  doorPeephole: boolean, // Глазок

  openingType: ICalculatorChar[], // тип відкривання
  
  size: ICalculatorChar[], // Розмір

  lowerLock: ICalculatorChar[], // Нижній замок

  upperLock: ICalculatorChar[], // Верхній замок

  doorHand: ICalculatorChar[], // Дверна ручка

  weight: ICalculatorChar[],  // Вага

  metalThickness: number, // Товщина металу

  frameMaterialConstruction: ICalculatorChar[], // Конструкція короба

  sealerCircuit: ICalculatorChar[], // Контур ущільнення

  description: string,
  
  homePage: boolean,

  images: string[],
}