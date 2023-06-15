import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoleFiltration } from '../../interfaces/common/hole-filtration.interface';
import { Observable, map } from 'rxjs';
import { IGetProducts } from '../../interfaces/common/get-products.interface';
import { environment } from '@environments/environment';
import { IProduct } from '../../interfaces/common/product.interface';
import { HttpProductService } from './http-product.service';
import { IProductResponse } from '../../interfaces/response/product.interface';
import { IGetProductsResponse } from '../../interfaces/response/get-products.interface';

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

    return this.http.post<IGetProductsResponse>(url, data).pipe(
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
