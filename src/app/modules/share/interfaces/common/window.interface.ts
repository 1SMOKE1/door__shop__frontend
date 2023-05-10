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

  mosquitNet?: string[] | null, // Москітна сітка

  windowSill?: string[] | null, // Підвіконня

  windowEbb?: string[] | null, // Віконний відлив

  windowHand?: string[] | null, // Віконна ручка
  
  childLock?: string[] | null, // Дитячий замок

  housewifeStub?: string[] | null, // Заглушка домогосподарки

  glassPocketAdd?: string[] | null, // Додаткові стеклопакети

  lamination?: string[] | null, // Ламінація

  profile?: string[] | null, // Профіль

  windowWidth?: number, // Ширина вікна

  windowHeight?: number, // Висота вікна

  camerasCount?: string[] | null, // Кількість камер

  features?: string[] | null, // Особливості
  
  sectionsCount?: string[] | null, // Кількість секцій

  description?: string;

  home_page?: boolean;

  images: string[];
}