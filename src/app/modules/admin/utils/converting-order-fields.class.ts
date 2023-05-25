import { ICalculatorChar } from "../interfaces/calculator-char.interface";

export class ConvertingOrderFieldsClass{
  protected convertingToString(arr: ICalculatorChar[]): string[]{
    const clearArr = arr.filter((el) => el.name !== '--- Оберіть ---');
    switch(true){
      case clearArr.length === 0:
        return ['Інформація відсутня'];
      case clearArr.length !== 0:
        return clearArr.map((el) => el.name);
      default:
        return clearArr.map((el) => el.name);
    }
  }
}