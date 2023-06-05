import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root',
})
export class LaminationService {
  private readonly baseUrl: string = `${environment.baseUrl}/window-lamination`;

  constructor(private readonly http: HttpClient) {}

  public getAllItems(): Observable<ICalculatorChar[]> {
    const url: string = this.baseUrl;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneItem(body: ICalculatorChar): Observable<ICalculatorChar> {
    const url: string = this.baseUrl;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneItem(body: ICalculatorChar): Observable<ICalculatorChar> {
    const url: string = `${this.baseUrl}/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneItem(id: number): Observable<string> {
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }
}
