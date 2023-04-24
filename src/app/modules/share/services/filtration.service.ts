import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoleFiltration } from '../interfaces/common/hole-filtration.interface';
import { Observable, map } from 'rxjs';
import { IGetProducts } from '../interfaces/common/get-products.interface';
import { environment } from 'src/environments/environment.development';
import { IProduct } from '../interfaces/common/product.interface';
import { HttpProductService } from './http-product.service';
import { IProductResponse } from '../interfaces/response/product.interface';

@Injectable({
  providedIn: 'root',
})
export class FiltrationService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly httpProductService: HttpProductService
  ){}

  public holeFiltrationWithPagination(data: IHoleFiltration, page: number, itemsPerPage: number): Observable<IGetProducts> {
    const url = `${this.baseUrl}/filtration?page=${page}&itemsPerPage=${itemsPerPage}`;

    return this.http.post<IProductResponse[]>(url, data).pipe(
      this.httpProductService.convertProducts(),
      map((products: IProduct[]): IGetProducts => ({products, productsLength: products.length}))
    )
  }

 
}
