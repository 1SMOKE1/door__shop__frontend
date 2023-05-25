import { CountryEnum } from "../../share/enums/country.enum";
import { GuaranteeEnum } from "../../share/enums/guarantee.enum";
import { InStockEnum } from "../../share/enums/in-stock.enum";
import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";
import { ICalculatorChar } from "./calculator-char.interface";

export interface IUpdateInteriorDoor{

  id: number;

  name: string;

  productProducerName: string | null;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  fabricMaterialThickness: number, // Товщина полотна // для обох дверей

  fabricMaterialHeight: number, // Висота полотна

  fabricMaterialWidth: ICalculatorChar[], // Ширина полотна

  doorIsolation: ICalculatorChar[], // Шумоізоляція

  doorFrameMaterial: ICalculatorChar[], // Короб

  doorSelectionBoard: ICalculatorChar[], // Добірна дошка

  doorWelt:  ICalculatorChar[], // Лиштва

  doorHand: ICalculatorChar[], // Ручка

  doorMechanism: ICalculatorChar[] , // Механізм

  doorLoops: ICalculatorChar[], // Петлі

  doorStopper:  ICalculatorChar[], // Стопор
  
  doorSlidingSystem: ICalculatorChar[], // Роздвижна система

  description: string;

  homePage: boolean;

  images: string[];
}