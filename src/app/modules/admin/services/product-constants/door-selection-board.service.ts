import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorSelectionBoardService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllDoorSelectionBoardItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}/door-selection-board`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneDoorSelectionBoardItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-selection-board`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneDoorSelectionBoardItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-selection-board/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneDoorSelectionBoardItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/door-selection-board/${id}`;

    return this.http.delete<string>(url);
  }
}
