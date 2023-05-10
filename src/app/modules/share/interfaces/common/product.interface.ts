import { ICalculatorChar } from "src/app/modules/admin/interfaces/calculator-char.interface";
import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { ITypeOfProductResponse } from "../response/type-of-product.interface";
import { IProductProducer } from "./product-producer.interface";

export interface IProduct{
  id: number;
  typeOfProduct: ITypeOfProductResponse; // Тип продкута
  productProducer: IProductProducer | null; // Производитель
  name: string, // Назва
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  price: number, // Ціна
  inStock: InStockEnum, // На складі
  //  Міжкімнатні
  fabricMaterialThickness: number, // Товщина полотна // для обох дверей
  fabricMaterialHeight: number, // Висота полотна
  fabricMaterialWidth: ICalculatorChar[], // Ширина полотна
  doorIsolation: ICalculatorChar[], // Шумоізоляція
  doorFrameMaterial: ICalculatorChar[], // Короб
  doorSelectionBoard: ICalculatorChar[], // Добірна дошка
  doorWelt:  ICalculatorChar[], // Лиштва
  doorHand: ICalculatorChar[], // Ручка
  doorMechanism: ICalculatorChar[], // Механізм
  doorLoops: ICalculatorChar[], // Петлі
  doorStopper:  ICalculatorChar[], // Стопор
  doorSlidingSystem: ICalculatorChar[], // Роздвижна система
  // Вхідні
  frameMaterialThickness: string[], // Товщина короба
  doorInsulation: string[] // Утеплення
  covering: string[], // Оздоблення
  doorPeephole: boolean, // Глазок
  openingType: string[], // Тип відкривання
  size: string[], // Розмір
  lowerLock: string[], // Нижній замок
  upperLock: string[], // Верхній замок
  weight: string[], // Вага
  metalThickness: number, // Товщина металу
  frameMaterialConstruction: string[]; // Конструкція короба
  sealerCircuit: string[]; // Контур Ущільнення
  // вікна
  mosquitNet: string[], // Москітна сітка
  windowSill: string[], // Підвіконня
  windowEbb: string[], // Віконний відлив
  windowHand: string[], // Віконна ручка
  childLock: string[], // Дитячий замок
  housewifeStub: string[], // Заглушка домогосподарки
  glassPocketAdd: string[], // Додаткові стеклопакети
  lamination: string[], // Ламінація
  profile: string[], // Профіль
  windowWidth: number, // Ширина вікна
  windowHeight: number, // Висота вікна
  camerasCount: string[], // Кількість камер
  features: string[], // Особливості
  sectionsCount: string[], // Кількість секцій
  description: string, // Опис
  homePage: boolean,
  images: string[],
}