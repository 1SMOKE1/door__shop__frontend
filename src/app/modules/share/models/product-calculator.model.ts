import { ICalculatorChar } from "../../admin/interfaces/calculator-char.interface";
import { ConvertingProductClass } from "../../admin/utils/converting-product.class";
import { CountryEnum } from "../enums/country.enum";
import { GuaranteeEnum } from "../enums/guarantee.enum";
import { InStockEnum } from "../enums/in-stock.enum";
import { IProductCaltulator } from "../interfaces/common/product-calculator.interface";
import { IProductProducer } from "../interfaces/common/product-producer.interface";
import { ITypeOfProductResponse } from "../interfaces/response/type-of-product.interface";

export class ProductCalculatorModel extends ConvertingProductClass implements IProductCaltulator{
  
  

  constructor(
    public id: number,
    public typeOfProduct: ITypeOfProductResponse,
    public productProducer: IProductProducer | null,
    public name: string,
    public country: CountryEnum,
    public guarantee: GuaranteeEnum,
    public price: number,
    public inStock: InStockEnum,
    public fabricMaterialThickness: number,
    public fabricMaterialHeight: number,
    public fabricMaterialWidth: ICalculatorChar | null,
    public doorIsolation: ICalculatorChar[],
    public doorFrameMaterial: ICalculatorChar | null,
    public doorSelectionBoard: ICalculatorChar | null,
    public doorWelt: ICalculatorChar | null,
    public doorHand: ICalculatorChar | null,
    public doorMechanism: ICalculatorChar | null,
    public doorLoops: ICalculatorChar | null,
    public doorStopper: ICalculatorChar | null,
    public doorSlidingSystem: ICalculatorChar | null,
    public frameMaterialThickness: number,
    public doorInsulation: ICalculatorChar[],
    public covering: ICalculatorChar[],
    public doorPeephole: boolean,
    public openingType: ICalculatorChar[],
    public size: ICalculatorChar[],
    public lowerLock: ICalculatorChar[],
    public upperLock: ICalculatorChar[],
    public weight: ICalculatorChar[],
    public metalThickness: number,
    public frameMaterialConstruction: ICalculatorChar[],
    public sealerCircuit: ICalculatorChar[],
    public mosquitoNet: ICalculatorChar | null,
    public windowSill: ICalculatorChar | null,
    public windowEbb: ICalculatorChar | null,
    public windowHand: ICalculatorChar | null,
    public childLock: ICalculatorChar | null,
    public housewifeStub: ICalculatorChar | null,
    public glassPocketAdd: ICalculatorChar | null,
    public lamination: ICalculatorChar | null,
    public profile: ICalculatorChar | null,
    public windowWidth: number,
    public windowHeight: number,
    public camerasCount: ICalculatorChar[],
    public features: ICalculatorChar[],
    public sectionsCount: ICalculatorChar[],
    public description: string,
    public homePage: boolean,
    public images: string[],
  ){
    super();
    this.fabricMaterialWidth = this.convertingProp(this.fabricMaterialWidth);
    this.doorFrameMaterial = this.convertingProp(this.doorFrameMaterial);
    this.doorSelectionBoard = this.convertingProp(this.doorSelectionBoard);
    this.doorWelt = this.convertingProp(this.doorWelt);
    this.doorHand = this.convertingProp(this.doorHand);
    this.doorMechanism = this.convertingProp(this.doorMechanism);
    this.doorLoops = this.convertingProp(this.doorLoops);
    this.doorStopper = this.convertingProp(this.doorStopper);
    this.doorSlidingSystem = this.convertingProp(this.doorSlidingSystem);

    this.mosquitoNet = this.convertingProp(this.mosquitoNet);
    this.windowSill = this.convertingProp(this.windowSill);
    this.windowEbb = this.convertingProp(this.windowEbb);
    this.windowHand = this.convertingProp(this.windowHand);
    this.childLock = this.convertingProp(this.childLock);
    this.housewifeStub = this.convertingProp(this.housewifeStub);
    this.glassPocketAdd = this.convertingProp(this.glassPocketAdd);
    this.lamination = this.convertingProp(this.lamination);
    this.profile = this.convertingProp(this.profile);
  }

 


}