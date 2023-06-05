import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FabricMaterialWidthService {
  private baseUrl: string = `${environment.baseUrl}/fabric-material-width`;

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
