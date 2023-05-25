import { CountryEnum } from '../../share/enums/country.enum';
import { GuaranteeEnum } from '../../share/enums/guarantee.enum';
import { InStockEnum } from '../../share/enums/in-stock.enum';
import { TypeOfProductEnum } from '../../share/enums/type-of-product.enum';
import { ICalculatorChar } from '../interfaces/calculator-char.interface';
import { IUpdateEntranceDoor } from '../interfaces/update-entrance-door.interface';
import { ConvertingProductClass } from '../utils/converting-product.class';

export class UpdateEntranceDoorModel
  extends ConvertingProductClass
  implements IUpdateEntranceDoor
{
  constructor(
    public id: number,

    public name: string,

    public productProducerName: null | string,

    public typeOfProductName: TypeOfProductEnum,

    public country: CountryEnum,

    public guarantee: GuaranteeEnum,

    public price: number,

    public inStock: InStockEnum,

    public fabricMaterialThickness: number, // Товщина полотна

    public frameMaterialThickness: number, // Товщина короба

    public doorInsulation: ICalculatorChar[], // Утеплення

    public covering: ICalculatorChar[], // Оздоблення

    public doorPeephole: boolean, // Глазок

    public openingType: ICalculatorChar[], // тип відкривання

    public size: ICalculatorChar[], // Розмір

    public lowerLock: ICalculatorChar[], // Нижній замок

    public upperLock: ICalculatorChar[], // Верхній замок

    public doorHand: ICalculatorChar[], // Дверна ручка

    public weight: ICalculatorChar[], // Вага

    public metalThickness: number, // Товщина металу

    public frameMaterialConstruction: ICalculatorChar[], // Конструкція короба

    public sealerCircuit: ICalculatorChar[], // Контур ущільнення

    public description: string,

    public homePage: boolean,

    public images: string[]
  ) {
    super();
    this.images = this.convertImages(this.images);
    this.price = this.convertNumber(this.price);
    //
    this.fabricMaterialThickness = this.convertNumber(
      this.fabricMaterialThickness
    );
    this.frameMaterialThickness = this.convertNumber(
      this.frameMaterialThickness
    );
    this.doorInsulation = this.checkOnNotEmptyArr(this.doorInsulation);
    this.covering = this.checkOnNotEmptyArr(this.covering);
    this.openingType = this.checkOnNotEmptyArr(this.openingType);
    this.size = this.checkOnNotEmptyArr(this.size);
    this.lowerLock = this.checkOnNotEmptyArr(this.lowerLock);
    this.upperLock = this.checkOnNotEmptyArr(this.upperLock);
    this.doorHand = this.checkOnNotEmptyArr(this.doorHand);
    this.weight = this.checkOnNotEmptyArr(this.weight);
    this.metalThickness = this.convertNumber(this.metalThickness);
    this.frameMaterialConstruction = this.checkOnNotEmptyArr(
      this.frameMaterialConstruction
    );
    this.sealerCircuit = this.checkOnNotEmptyArr(this.sealerCircuit);
  }
}
