import { ICalculatorChar } from '@modules/admin/interfaces/calculator-char.interface';
import { CountryEnum } from '../../enums/country.enum';
import { GuaranteeEnum } from '../../enums/guarantee.enum';
import { InStockEnum } from '../../enums/in-stock.enum';
import { TypeOfProductEnum } from '../../enums/type-of-product.enum';

export interface IEntranceDoor {
  id: number;

  name: string;

  productProducerName: string | null;

  typeOfProductName: TypeOfProductEnum;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  inStock: InStockEnum;

  fabricMaterialThickness: number;

  frameMaterialThickness: number; // Товщина короба

  doorInsulation: ICalculatorChar[]; // Утеплення

  covering: ICalculatorChar[]; // Оздоблення

  doorPeephole: boolean; // Глазок

  openingType: ICalculatorChar[]; // Тип відкривання

  size: ICalculatorChar[]; // Розмір

  lowerLock: ICalculatorChar[]; // Нижній замок

  upperLock: ICalculatorChar[]; // Верхній замок

  weight: ICalculatorChar[]; // Вага

  metalThickness: number; // Товщина металу

  frameMaterialConstruction: ICalculatorChar[]; // Конструкція короба

  sealerCircuit: ICalculatorChar[]; // Контур Ущільнення

  doorHand: ICalculatorChar[];

  homePage?: boolean;

  images?: string[];

  description?: string;
}
