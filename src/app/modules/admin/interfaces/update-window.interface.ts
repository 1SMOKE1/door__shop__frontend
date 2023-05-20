import { CountryEnum } from "../../share/enums/country.enum";
import { GuaranteeEnum } from "../../share/enums/guarantee.enum";
import { InStockEnum } from "../../share/enums/in-stock.enum";
import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";
import { ICalculatorChar } from "./calculator-char.interface";

export interface IUpdateWindow{

  id: number;

  name: string;

  productProducerName: string;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  mosquitoNet: ICalculatorChar[]; // Москітна сітка

  windowSill: ICalculatorChar[]; // Підвіконня

  windowEbb: ICalculatorChar[]; // Відлив

  windowHand: ICalculatorChar[]; // Ручка віконна

  childLock: ICalculatorChar[]; // Дитячий замок

  housewifeStub: ICalculatorChar[]; // Заглушка домогосподарки

  glassPocketAdd: ICalculatorChar[]; // Доповлення до стеклопакету

  lamination: ICalculatorChar[]; // Ламінація

  profile: ICalculatorChar[]; // Профіль

  windowWidth: number; // Ширина вікна

  windowHeight: number; // Висота вікна

  camerasCount: ICalculatorChar[]; // Кількість камер

  features: ICalculatorChar[]; // Обосливості

  sectionsCount: ICalculatorChar[]; // Кількість секцій

  description: string,
  
  homePage: boolean,

  images: string[],
}