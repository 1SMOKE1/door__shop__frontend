import { ICalculatorChar } from '@modules/admin/interfaces/calculator-char.interface';
import { CountryEnum } from '../../enums/country.enum';
import { GuaranteeEnum } from '../../enums/guarantee.enum';
import { InStockEnum } from '../../enums/in-stock.enum';
import { ITypeOfProductResponse } from '../response/type-of-product.interface';
import { IProductProducer } from './product-producer.interface';

export interface IProductCaltulator {
  id: number;
  typeOfProduct: ITypeOfProductResponse; // Тип продкута
  productProducer: IProductProducer | null; // Производитель
  name: string; // Назва
  country: CountryEnum; // Країна виробник
  guarantee: GuaranteeEnum; // Гарантійний термін
  price: number; // Ціна
  inStock: InStockEnum; // На складі
  //  Міжкімнатні
  fabricMaterialThickness: number; // Товщина полотна // для обох дверей
  fabricMaterialHeight: number; // Висота полотна
  fabricMaterialWidth: ICalculatorChar | null; // Ширина полотна
  doorIsolation: ICalculatorChar[]; // Шумоізоляція
  doorFrameMaterial: ICalculatorChar | null; // Короб
  doorSelectionBoard: ICalculatorChar | null; // Добірна дошка
  doorWelt: ICalculatorChar | null; // Лиштва
  doorHand: ICalculatorChar | null; // Ручка
  doorMechanism: ICalculatorChar | null; // Механізм
  doorLoops: ICalculatorChar | null; // Петлі
  doorStopper: ICalculatorChar | null; // Стопор
  doorSlidingSystem: ICalculatorChar | null; // Роздвижна система
  // Вхідні
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
  // вікна
  mosquitoNet: ICalculatorChar | null; // Москітна сітка
  windowSill: ICalculatorChar | null; // Підвіконня
  windowEbb: ICalculatorChar | null; // Віконний відлив
  windowHand: ICalculatorChar | null; // Віконна ручка
  childLock: ICalculatorChar | null; // Дитячий замок
  housewifeStub: ICalculatorChar | null; // Заглушка домогосподарки
  glassPocketAdd: ICalculatorChar | null; // Додаткові стеклопакети
  lamination: ICalculatorChar | null; // Ламінація
  profile: ICalculatorChar | null; // Профіль
  windowWidth: number; // Ширина вікна
  windowHeight: number; // Висота вікна
  camerasCount: ICalculatorChar[]; // Кількість камер
  features: ICalculatorChar[]; // Особливості
  sectionsCount: ICalculatorChar[]; // Кількість секцій
  description: string; // Опис
  homePage: boolean;
  images: string[];
  choosenImage: string;
}
