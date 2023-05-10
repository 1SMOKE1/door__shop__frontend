import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorIsolationService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllDoorIsolationItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}/door-isolation`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneDoorIsolationItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-isolation`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneDoorIsolationItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-isolation/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneDoorIsolationItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/door-isolation/${id}`;

    return this.http.delete<string>(url);
  }
}
