import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorInsulationService {

  baseUrl: string = `${environment.baseUrl}/door-insulation`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllDoorInsulationItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneDoorInsulationItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneDoorInsulationItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneDoorInsulationItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }
}
