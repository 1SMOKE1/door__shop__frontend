import { CountryEnum } from '../../share/enums/country.enum';
import { GuaranteeEnum } from '../../share/enums/guarantee.enum';
import { InStockEnum } from '../../share/enums/in-stock.enum';
import { TypeOfProductEnum } from '../../share/enums/type-of-product.enum';
import { ICalculatorChar } from '../interfaces/calculator-char.interface';
import { IUpdateInteriorDoor } from '../interfaces/update-interior-door.interface';
import { ConvertingProductClass } from '../utils/converting-product.class';

export class UpdateInteriorDoorModel
  extends ConvertingProductClass
  implements IUpdateInteriorDoor
{
  constructor(
    public id: number,

    public name: string,

    public productProducerName: string | null,

    public typeOfProductName: TypeOfProductEnum,

    public country: CountryEnum,

    public guarantee: GuaranteeEnum,

    public price: number,

    public inStock: InStockEnum,

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
    this.fabricMaterialHeight = this.convertNumber(this.fabricMaterialHeight);
    this.fabricMaterialWidth = this.checkOnNotEmptyArr(
      this.fabricMaterialWidth
    );
    this.doorIsolation = this.checkOnNotEmptyArr(this.doorIsolation);
    this.doorFrameMaterial = this.checkOnNotEmptyArr(this.doorFrameMaterial);
    this.doorSelectionBoard = this.checkOnNotEmptyArr(this.doorSelectionBoard);
    this.doorWelt = this.checkOnNotEmptyArr(this.doorWelt);
    this.doorHand = this.checkOnNotEmptyArr(this.doorHand);
    this.doorMechanism = this.checkOnNotEmptyArr(this.doorMechanism);
    this.doorLoops = this.checkOnNotEmptyArr(this.doorLoops);
    this.doorStopper = this.checkOnNotEmptyArr(this.doorStopper);
    this.doorSlidingSystem = this.checkOnNotEmptyArr(this.doorSlidingSystem);
  }
}
