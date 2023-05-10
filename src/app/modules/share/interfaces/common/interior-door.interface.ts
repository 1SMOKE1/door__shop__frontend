import { ICalculatorChar } from "src/app/modules/admin/interfaces/calculator-char.interface";
import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { TypeOfProductEnum } from "../../enums/type-of-product.enum";


export interface IInteriorDoor{
  id: number;

  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  fabricMaterialThickness: number; // Товщина полотна // для обох дверей

  fabricMaterialHeight: number; // Висота полотна

  fabricMaterialWidth: ICalculatorChar[]; // Ширина полотна

  doorIsolation: ICalculatorChar[]; // Шумоізоляція

  doorFrameMaterial: ICalculatorChar[]; // Короб

  doorSelectionBoard: ICalculatorChar[]; // Добірна дошка

  doorWelt: ICalculatorChar[]; // Лиштва

  doorHand: ICalculatorChar[]; // Ручка

  doorMechanism: ICalculatorChar[]; // Механізм

  doorLoops: ICalculatorChar[]; // Петлі

  doorStopper: ICalculatorChar[]; // Стопор

  doorSlidingSystem: ICalculatorChar[]; // Роздвижна система

  description: string;

  homePage: boolean;

  images: string[];
}