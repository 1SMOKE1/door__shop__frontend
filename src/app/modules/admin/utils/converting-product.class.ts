import { IFurniture } from "../../share/interfaces/common/furniture.interface";
import { ICalculatorChar } from "../interfaces/calculator-char.interface";

export class ConvertingProductClass {
  protected checkOnNotEmptyArr(val: ICalculatorChar[] | null | undefined): ICalculatorChar[]{
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

  protected convertImages(images: string[]): string[]{
    return images?.length !== 0 ? images : ['assets/no_image.jpg'];
  }

  protected convertNumber(num: number | undefined): number{
    return num ? +num : 0;
  }

  protected checkOnNotEmptyProductArr(val: any[]| undefined): ICalculatorChar[]{
    if(val && val[0] !== '')
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

  protected convertCalculatorChar(arr: IFurniture[] | ICalculatorChar[]):ICalculatorChar[] {
    return arr.map((el) => ({name: el.name, price: el.price ? +el.price : 0, id: el.id}));
  } 
}