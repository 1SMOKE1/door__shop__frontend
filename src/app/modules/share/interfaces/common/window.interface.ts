import { ICalculatorChar } from "src/app/modules/admin/interfaces/calculator-char.interface";
import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { TypeOfProductEnum } from "../../enums/type-of-product.enum";

export interface IWindow{

  id: number;

  name: string;

  productProducerName: string;

  typeOfProduct: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  mosquitNet: ICalculatorChar[], // Москітна сітка

  windowSill: ICalculatorChar[], // Підвіконня

  windowEbb: ICalculatorChar[], // Віконний відлив

  windowHand: ICalculatorChar[], // Віконна ручка
  
  childLock: ICalculatorChar[], // Дитячий замок

  housewifeStub: ICalculatorChar[], // Заглушка домогосподарки

  glassPocketAdd: ICalculatorChar[], // Додаткові стеклопакети

  lamination: ICalculatorChar[], // Ламінація

  profile: ICalculatorChar[], // Профіль

  windowWidth: number, // Ширина вікна

  windowHeight: number, // Висота вікна

  camerasCount: ICalculatorChar[], // Кількість камер

  features: ICalculatorChar[], // Особливості
  
  sectionsCount: ICalculatorChar[], // Кількість секцій

  description?: string;

  home_page?: boolean;

  images: string[];
}