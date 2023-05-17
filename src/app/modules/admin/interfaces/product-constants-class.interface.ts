import { Observable } from "rxjs";
import { ICalculatorChar } from "./calculator-char.interface";

export interface IProductConstantsClass{

  readonly baseUrl: string;

  getAllItems(): Observable<ICalculatorChar[]>

  createOneItem<F>(formValue: F): Observable<ICalculatorChar>

  updateOneItem<F>(formValue: F): Observable<ICalculatorChar>

  deleteOneItem(id: number): Observable<string>
}