import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalculatorChar } from '../../interfaces/calculator-char.interface';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricMaterialWidthService {

  baseUrl: string = `${environment.baseUrl}/fabric-material-width`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllFabricMaterialWidthItems(): Observable<ICalculatorChar[]>{
    const url: string = `${this.baseUrl}`;

    return this.http.get<ICalculatorChar[]>(url);
  }

  public createOneFabricMaterialWidthItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}`;

    return this.http.post<ICalculatorChar>(url, body);
  }

  public updateOneFabricMaterialWidthItem(body: ICalculatorChar): Observable<ICalculatorChar>{
    const url: string = `${this.baseUrl}/${body.id}`;

    return this.http.put<ICalculatorChar>(url, body);
  }

  public deleteOneFabricMaterialWidthItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }
}
