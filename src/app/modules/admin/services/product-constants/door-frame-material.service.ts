import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class DoorFrameMaterialService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllDoorFrameMaterialItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}/door-frame-material`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneDoorFrameMaterialItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-frame-material`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneDoorFrameMaterialItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/door-frame-material/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneDoorFrameMaterialItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/door-frame-material/${id}`;

    return this.http.delete<string>(url);
  }
}
