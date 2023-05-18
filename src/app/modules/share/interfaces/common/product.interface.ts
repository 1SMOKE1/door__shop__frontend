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
  frameMaterialThickness: number, // Товщина короба
  doorInsulation: ICalculatorChar[] // Утеплення
  covering: ICalculatorChar[], // Оздоблення
  doorPeephole: boolean, // Глазок
  openingType: ICalculatorChar[], // Тип відкривання
  size: ICalculatorChar[], // Розмір
  lowerLock: ICalculatorChar[], // Нижній замок
  upperLock: ICalculatorChar[], // Верхній замок
  weight: ICalculatorChar[], // Вага
  metalThickness: number, // Товщина металу
  frameMaterialConstruction: ICalculatorChar[]; // Конструкція короба
  sealerCircuit: ICalculatorChar[]; // Контур Ущільнення
  // вікна
  mosquitoNet: ICalculatorChar[], // Москітна сітка
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
  description: string, // Опис
  homePage: boolean,
  images: string[],
}