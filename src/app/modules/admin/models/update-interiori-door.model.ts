import { CountryEnum } from '../../share/enums/country.enum';
import { GuaranteeEnum } from '../../share/enums/guarantee.enum';
import { InStockEnum } from '../../share/enums/in-stock.enum';
import { TypeOfProductEnum } from '../../share/enums/type-of-product.enum';
import { ICalculatorChar } from '../interfaces/calculator-char.interface';
import { IUpdateInteriorDoor } from '../interfaces/update-interior-door.interface';

export class UpdateInteriorDoorModel implements IUpdateInteriorDoor{

  constructor(
    public id: number,

    public name: string,
  
    public productProducerName: string,
  
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
  
    public doorWelt:  ICalculatorChar[], // Лиштва
  
    public doorHand: ICalculatorChar[], // Ручка
  
    public doorMechanism: ICalculatorChar[] , // Механізм
  
    public doorLoops: ICalculatorChar[], // Петлі
  
    public doorStopper:  ICalculatorChar[], // Стопор
    
    public doorSlidingSystem: ICalculatorChar[], // Роздвижна система
  
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
  }

  

  // private checkOnNotEmpty(val: string[] | null | undefined): string[]{
  //   if(val)
  //     switch(true){
  //       case val[0] === '':
  //         return [];
  //       case val[0] === "--- Оберіть ---":
  //         const [choose, ...values] = val;
  //         return [...values];
  //       case val[0] !== '':
  //         return [...val];
  //       default: 
  //         return [];
  //     }
  //   return [];
  // }

  private checkOnNotEmptyCalculatorChar(val: ICalculatorChar[] | null | undefined): ICalculatorChar[]{
    if(val)
      switch(true){
        case val.length === 0 :
          return [];
        case val.length !== 0:
          return [...val];
        case val[0].name === "--- Оберіть ---" || val[0].name === '':
          const [choose, ...values] = val;
          return [...values];
        default: 
          return [];
      }
    return []
  }
}