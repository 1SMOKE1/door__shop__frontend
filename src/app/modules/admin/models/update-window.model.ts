import { CountryEnum } from '../../share/enums/country.enum';
import { GuaranteeEnum } from '../../share/enums/guarantee.enum';
import { InStockEnum } from '../../share/enums/in-stock.enum';
import { TypeOfProductEnum } from '../../share/enums/type-of-product.enum';
import { ICalculatorChar } from '../interfaces/calculator-char.interface';
import { IUpdateWindow } from '../interfaces/update-window.interface';
import { ConvertingProductClass } from '../utils/converting-product.class';

export class UpdateWindowModel
  extends ConvertingProductClass
  implements IUpdateWindow
{
  constructor(
    public id: number,

    public name: string,

    public productProducerName: string,

    public typeOfProductName: TypeOfProductEnum,

    public country: CountryEnum,

    public guarantee: GuaranteeEnum,

    public price: number,

    public inStock: InStockEnum,

    public mosquitoNet: ICalculatorChar[], // Москітна сітка

    public windowSill: ICalculatorChar[], // Підвіконня

    public windowEbb: ICalculatorChar[], // Відлив

    public windowHand: ICalculatorChar[], // Ручка віконна

    public childLock: ICalculatorChar[], // Дитячий замок

    public housewifeStub: ICalculatorChar[], // Заглушка домогосподарки

    public glassPocketAdd: ICalculatorChar[], // Доповлення до стеклопакету

    public lamination: ICalculatorChar[], // Ламінація

    public profile: ICalculatorChar[], // Профіль

    public windowWidth: number, // Ширина вікна

    public windowHeight: number, // Висота вікна

    public camerasCount: ICalculatorChar[], // Кількість камер

    public features: ICalculatorChar[], // Обосливості

    public sectionsCount: ICalculatorChar[], // Кількість секцій

    public description: string,

    public homePage: boolean,

    public images: string[]
  ) {
    super();
    this.images = this.convertImages(this.images);
    this.price = this.convertNumber(this.price);
    //
    this.mosquitoNet = this.checkOnNotEmptyArr(this.mosquitoNet);
    this.windowSill = this.checkOnNotEmptyArr(this.windowSill);
    this.windowEbb = this.checkOnNotEmptyArr(this.windowEbb);
    this.windowHand = this.checkOnNotEmptyArr(this.windowHand);
    this.childLock = this.checkOnNotEmptyArr(this.childLock);
    this.housewifeStub = this.checkOnNotEmptyArr(this.housewifeStub);
    this.glassPocketAdd = this.checkOnNotEmptyArr(this.glassPocketAdd);
    this.lamination = this.checkOnNotEmptyArr(this.lamination);
    this.profile = this.checkOnNotEmptyArr(this.profile);
    this.windowWidth = this.convertNumber(this.windowWidth);
    this.windowHeight = this.convertNumber(this.windowHeight);
    this.camerasCount = this.checkOnNotEmptyArr(this.camerasCount);
    this.features = this.checkOnNotEmptyArr(this.features);
    this.sectionsCount = this.checkOnNotEmptyArr(this.sectionsCount);
  }
}
