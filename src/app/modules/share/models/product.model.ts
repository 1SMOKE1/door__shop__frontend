import { ICalculatorChar } from "../../admin/interfaces/calculator-char.interface";
import { CountryEnum } from "../enums/country.enum";
import { GuaranteeEnum } from "../enums/guarantee.enum";
import { InStockEnum } from "../enums/in-stock.enum";
import { IProductProducer } from "../interfaces/common/product-producer.interface";
import { IProduct } from "../interfaces/common/product.interface";
import { ITypeOfProductResponse } from "../interfaces/response/type-of-product.interface";

export class ProductModel implements IProduct{

  private choose: string = '--- Оберіть ---';

  constructor(
    public id: number,
    public productProducer: IProductProducer | null,
    public typeOfProduct: ITypeOfProductResponse,
    public name: string,
    public country: CountryEnum,
    public guarantee: GuaranteeEnum,
    public price: number,
    public inStock: InStockEnum,
    // Міжкімнатні
    public fabricMaterialThickness: number, // Товщина полотна // для обох дверей
    public fabricMaterialHeight: number, // Висота полотна
    public fabricMaterialWidth: ICalculatorChar[], // Ширина полотна
    public doorIsolation: ICalculatorChar[], // Шумоізоляція
    public doorFrameMaterial: ICalculatorChar[], // Короб
    public doorSelectionBoard: ICalculatorChar[], // Добірна дошка
    public doorWelt:  ICalculatorChar[], // Лиштва
    public doorHand: ICalculatorChar[], // Ручка
    public doorMechanism: ICalculatorChar[], // Механізм
    public doorLoops: ICalculatorChar[], // Петлі
    public doorStopper:  ICalculatorChar[], // Стопор
    public doorSlidingSystem: ICalculatorChar[], // Роздвижна система
    // Вхідні
    public frameMaterialThickness: string[], // Товщина короба
    public doorInsulation: string[], // Утеплення
    public covering: string[], // Оздоблення
    public doorPeephole: boolean, // Глазок
    public openingType: string[], // Тип відкривання
    public size: string[], // Розмір
    public lowerLock: string[], // Нижній замок
    public upperLock: string[], // Верхній замок
    public weight: string[], // Вага
    public metalThickness: number, // Товщина металу
    public frameMaterialConstruction: string[], // Конструкція короба
    public sealerCircuit: string[], // Контур Ущільнення
    // вікна
    public mosquitNet: string[], // Москітна сітка
    public windowSill: string[], // Підвіконня
    public windowEbb: string[], // Віконний відлив
    public windowHand: string[], // Віконна ручка
    public childLock: string[], // Дитячий замок
    public housewifeStub: string[], // Заглушка домогосподарки
    public glassPocketAdd: string[], // Додаткові стеклопакети
    public lamination: string[], // Ламінація
    public profile: string[], // Профіль
    public windowWidth: number, // Ширина вікна
    public windowHeight: number, // Висота вікна
    public camerasCount: string[], // Кількість камер
    public features: string[], // Особливості
    public sectionsCount: string[], // Кількість секцій
    public description: string,
    public homePage: boolean,
    public images: string[],
  ){
    this.images = this.images?.length !== 0 ? this.images : ['assets/no_image.jpg'];
    // 
    this.fabricMaterialThickness = this.fabricMaterialThickness ? this.fabricMaterialThickness : 0;
    this.fabricMaterialHeight = this.fabricMaterialHeight ? this.fabricMaterialHeight : 0;
    this.fabricMaterialWidth = this.checkOnNotEmptyCalculatorChar(this.fabricMaterialWidth);
    this.doorIsolation = this.checkOnNotEmptyCalculatorChar(this.doorIsolation);
    this.doorFrameMaterial = this.checkOnNotEmptyCalculatorChar(this.doorFrameMaterial);
    this.doorSelectionBoard = this.checkOnNotEmptyCalculatorChar(this.doorSelectionBoard);
    this.doorWelt = this.checkOnNotEmptyCalculatorChar(this.doorWelt);
    this.doorHand = this.checkOnNotEmptyCalculatorChar(this.doorHand);
    this.doorMechanism = this.checkOnNotEmptyCalculatorChar(this.doorMechanism);
    this.doorLoops = this.checkOnNotEmptyCalculatorChar(this.doorLoops);
    this.doorStopper = this.checkOnNotEmptyCalculatorChar(this.doorStopper);
    this.doorSlidingSystem = this.checkOnNotEmptyCalculatorChar(this.doorSlidingSystem);
    //
    this.frameMaterialThickness = this.checkOnNotEmpty(this.frameMaterialThickness);
    this.doorInsulation = this.checkOnNotEmpty(this.doorInsulation);
    this.covering = this.checkOnNotEmpty(this.covering);
    this.openingType = this.checkOnNotEmpty(this.openingType);
    this.size = this.checkOnNotEmpty(this.size);
    this.lowerLock = this.checkOnNotEmpty(this.lowerLock);
    this.upperLock = this.checkOnNotEmpty(this.upperLock);
    this.weight = this.checkOnNotEmpty(this.weight);
    this.metalThickness = this.metalThickness ? this.metalThickness : 0;
    this.frameMaterialConstruction = this.checkOnNotEmpty(this.frameMaterialConstruction);
    this.sealerCircuit = this.checkOnNotEmpty(this.sealerCircuit);
    //
    this.mosquitNet = this.checkOnNotEmpty(this.mosquitNet);
    this.windowSill = this.checkOnNotEmpty(this.windowSill);
    this.windowEbb = this.checkOnNotEmpty(this.windowEbb);
    this.windowHand = this.checkOnNotEmpty(this.windowHand);
    this.childLock = this.checkOnNotEmpty(this.childLock);
    this.housewifeStub = this.checkOnNotEmpty(this.housewifeStub);
    this.glassPocketAdd = this.checkOnNotEmpty(this.glassPocketAdd);
    this.lamination = this.checkOnNotEmpty(this.lamination);
    this.profile = this.checkOnNotEmpty(this.profile);
    this.windowWidth = this.windowWidth ? this.windowWidth : 0;
    this.windowHeight = this.windowHeight ? this.windowHeight : 0;
    this.camerasCount = this.checkOnNotEmpty(this.camerasCount);
    this.features = this.checkOnNotEmpty(this.features);
    this.sectionsCount = this.checkOnNotEmpty(this.sectionsCount);
  }

  private checkOnNotEmpty(val: string[]| null | undefined): string[]{
    if(val)
      switch(true){
        case val[0] === '':
          return [this.choose];
        case val[0] !== '':
          return [this.choose, ...val];
        default: 
          return [];
      }
    return []
  }

  private checkOnNotEmptyCalculatorChar(val: any| null | undefined): ICalculatorChar[]{
    if(val[0] !== '')
      switch(true){
        case val.length === 0 :
          return [];
        case val.length !== 0 :
          return [...val];
        default: 
          return [];
      }
    return []
  }
}