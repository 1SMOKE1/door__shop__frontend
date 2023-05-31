import { ICalculatorChar } from "../interfaces/calculator-char.interface";

export class ConvertingOrderFieldsClass{
  protected convertingToString(arr: ICalculatorChar[]): string[]{
    const clearArr = arr.filter((el) => el.name !== '--- Оберіть ---');
    switch(true){
      case clearArr.length === 0:
        return [];
      case clearArr.length !== 0:
        return clearArr.map((el) => el.name);
      default:
        return clearArr.map((el) => el.name);
    }
  }

  protected converting(arr: ICalculatorChar[] | undefined): ICalculatorChar[]{
    if(arr){
      const clearArr = arr.filter((el) => el.name !== '--- Оберіть ---');
      switch(true){
        case clearArr.length === 0:
          return [];
        case clearArr.length !== 0:
          return clearArr
        default:
          return clearArr;
      }
    }
    return []
  }


}