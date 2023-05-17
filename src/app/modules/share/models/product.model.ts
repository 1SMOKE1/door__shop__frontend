import { ICalculatorChar } from '../../admin/interfaces/calculator-char.interface';
import { ConvertingProductClass } from '../../admin/utils/converting-product.class';
import { CountryEnum } from '../enums/country.enum';
import { GuaranteeEnum } from '../enums/guarantee.enum';
import { InStockEnum } from '../enums/in-stock.enum';
import { IProductProducer } from '../interfaces/common/product-producer.interface';
import { IProduct } from '../interfaces/common/product.interface';
import { ITypeOfProductResponse } from '../interfaces/response/type-of-product.interface';

export class ProductModel extends ConvertingProductClass implements IProduct {
  // private readonly choose: string = '--- Оберіть ---';

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
    public doorWelt: ICalculatorChar[], // Лиштва
    public doorHand: ICalculatorChar[], // Ручка
    public doorMechanism: ICalculatorChar[], // Механізм
    public doorLoops: ICalculatorChar[], // Петлі
    public doorStopper: ICalculatorChar[], // Стопор
    public doorSlidingSystem: ICalculatorChar[], // Роздвижна система
    // Вхідні
    public frameMaterialThickness: number, // Товщина короба
    public doorInsulation: ICalculatorChar[], // Утеплення
    public covering: ICalculatorChar[], // Оздоблення
    public doorPeephole: boolean, // Глазок
    public openingType: ICalculatorChar[], // Тип відкривання
    public size: ICalculatorChar[], // Розмір
    public lowerLock: ICalculatorChar[], // Нижній замок
    public upperLock: ICalculatorChar[], // Верхній замок
    public weight: ICalculatorChar[], // Вага
    public metalThickness: number, // Товщина металу
    public frameMaterialConstruction: ICalculatorChar[], // Конструкція короба
    public sealerCircuit: ICalculatorChar[], // Контур Ущільнення
    // вікна
    public mosquitNet: ICalculatorChar[], // Москітна сітка
    public windowSill: ICalculatorChar[], // Підвіконня
    public windowEbb: ICalculatorChar[], // Віконний відлив
    public windowHand: ICalculatorChar[], // Віконна ручка
    public childLock: ICalculatorChar[], // Дитячий замок
    public housewifeStub: ICalculatorChar[], // Заглушка домогосподарки
    public glassPocketAdd: ICalculatorChar[], // Додаткові стеклопакети
    public lamination: ICalculatorChar[], // Ламінація
    public profile: ICalculatorChar[], // Профіль
    public windowWidth: number, // Ширина вікна
    public windowHeight: number, // Висота вікна
    public camerasCount: ICalculatorChar[], // Кількість камер
    public features: ICalculatorChar[], // Особливості
    public sectionsCount: ICalculatorChar[], // Кількість секцій
    public description: string,
    public homePage: boolean,
    public images: string[]
  ) {
    super();
    this.images = this.convertImages(this.images);
    //
    this.fabricMaterialThickness = this.convertNumber(
      this.fabricMaterialThickness
    );
    this.fabricMaterialHeight = this.convertNumber(this.fabricMaterialHeight);
    this.fabricMaterialWidth = this.checkOnNotEmptyProductArr(
      this.fabricMaterialWidth
    );
    this.doorIsolation = this.checkOnNotEmptyProductArr(this.doorIsolation);
    this.doorFrameMaterial = this.checkOnNotEmptyProductArr(
      this.doorFrameMaterial
    );
    this.doorSelectionBoard = this.checkOnNotEmptyProductArr(
      this.doorSelectionBoard
    );
    this.doorWelt = this.checkOnNotEmptyProductArr(this.doorWelt);
    this.doorHand = this.checkOnNotEmptyProductArr(this.doorHand);
    this.doorMechanism = this.checkOnNotEmptyProductArr(this.doorMechanism);
    this.doorLoops = this.checkOnNotEmptyProductArr(this.doorLoops);
    this.doorStopper = this.checkOnNotEmptyProductArr(this.doorStopper);
    this.doorSlidingSystem = this.checkOnNotEmptyProductArr(
      this.doorSlidingSystem
    );
    //
    this.frameMaterialThickness = this.convertNumber(
      this.frameMaterialThickness
    );
    this.doorInsulation = this.checkOnNotEmptyProductArr(this.doorInsulation);
    this.covering = this.checkOnNotEmptyProductArr(this.covering);
    this.openingType = this.checkOnNotEmptyProductArr(this.openingType);
    this.size = this.checkOnNotEmptyProductArr(this.size);
    this.lowerLock = this.checkOnNotEmptyProductArr(this.lowerLock);
    this.upperLock = this.checkOnNotEmptyProductArr(this.upperLock);
    this.weight = this.checkOnNotEmptyProductArr(this.weight);
    this.metalThickness = this.convertNumber(this.metalThickness);
    this.frameMaterialConstruction = this.checkOnNotEmptyProductArr(
      this.frameMaterialConstruction
    );
    this.sealerCircuit = this.checkOnNotEmptyProductArr(this.sealerCircuit);
    //
    this.mosquitNet = this.checkOnNotEmptyProductArr(this.mosquitNet);
    this.windowSill = this.checkOnNotEmptyProductArr(this.windowSill);
    this.windowEbb = this.checkOnNotEmptyProductArr(this.windowEbb);
    this.windowHand = this.checkOnNotEmptyProductArr(this.windowHand);
    this.childLock = this.checkOnNotEmptyProductArr(this.childLock);
    this.housewifeStub = this.checkOnNotEmptyProductArr(this.housewifeStub);
    this.glassPocketAdd = this.checkOnNotEmptyProductArr(this.glassPocketAdd);
    this.lamination = this.checkOnNotEmptyProductArr(this.lamination);
    this.profile = this.checkOnNotEmptyProductArr(this.profile);
    this.windowWidth = this.convertNumber(this.windowWidth);
    this.windowHeight = this.convertNumber(this.windowHeight);
    this.camerasCount = this.checkOnNotEmptyProductArr(this.camerasCount);
    this.features = this.checkOnNotEmptyProductArr(this.features);
    this.sectionsCount = this.checkOnNotEmptyProductArr(this.sectionsCount);
  }
}
