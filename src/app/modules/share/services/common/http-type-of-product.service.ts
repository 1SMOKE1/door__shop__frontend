import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ITypeOfProductResponse } from '../../interfaces/response/type-of-product.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpTypeOfProductService {

  private baseUrl: string = `${environment.baseUrl}/type-of-products`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllTypeOfProducts(): Observable<ITypeOfProductResponse[]>{
    const url: string = this.baseUrl;

    return this.http.get<ITypeOfProductResponse[]>(url);
  }

  public getTypeOfProduct(id: number): Observable<ITypeOfProductResponse>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.get<ITypeOfProductResponse>(url)

  }
}
