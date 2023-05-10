import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorWeltService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllDoorWeltItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}/door-welt`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneDoorWeltItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-welt`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneDoorWeltItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-welt/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneDoorWeltItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/door-welt/${id}`;

    return this.http.delete<string>(url);
  }
}
