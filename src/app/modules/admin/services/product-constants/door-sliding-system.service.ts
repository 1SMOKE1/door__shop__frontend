import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorSlidingSystemService {

  baseUrl: string = `${environment.baseUrl}/door-sliding-system`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getDoorSlidingSystemItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createDoorSlidingSystemItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateDoorSlidingSystemItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteDoorSlidingSystemItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }
}
