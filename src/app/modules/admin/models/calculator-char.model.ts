import { ICalculatorChar } from "../interfaces/calculator-char.interface";



export class CalculatorCharModel implements ICalculatorChar{
  constructor(
    public name: string,
    public price?: number,
    public id?: number
  ){}

  
} 