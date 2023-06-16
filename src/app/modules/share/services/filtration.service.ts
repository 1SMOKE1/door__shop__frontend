import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoleFiltration } from '@share-interfaces/common/hole-filtration.interface';
import { Observable, map } from 'rxjs';
import { IGetProducts } from '@share-interfaces/common/get-products.interface';
import { environment } from '@environments/environment';
import { IProduct } from '@share-interfaces/common/product.interface';
import { HttpProductService } from './http-product.service';
import { IProductResponse } from '@share-interfaces/response/product.interface';
import { IGetProductsResponse } from '@share-interfaces/response/get-products.interface';

@Injectable({
  providedIn: 'root',
})
export class FiltrationService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly httpProductService: HttpProductService
  ) {}

  public holeFiltrationWithPagination(
    data: IHoleFiltration,
    page: number,
    itemsPerPage: number
  ): Observable<IGetProducts> {
    const url = `${this.baseUrl}/products/filtration?page=${page}&itemsPerPage=${itemsPerPage}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'data': encodeURIComponent(JSON.stringify(data))
    });

    return this.http.get<IGetProductsResponse>(url, {headers})
    .pipe(
      map(
        ({ products, productsLength }: IGetProductsResponse): IGetProducts => ({
          products: products.map(
            (el: IProductResponse): IProduct =>
              this.httpProductService.convertProduct(el)
          ),
          productsLength,
        })
      )
    );
  }

}
