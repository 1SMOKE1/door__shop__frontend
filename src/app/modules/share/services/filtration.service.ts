import { Injectable } from '@angular/core';
import { IHoleFiltration } from '@share-interfaces/common/hole-filtration.interface';
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
    private readonly httpProductService: HttpProductService
  ) {}

  public holeFiltrationWithPagination(
    data: IHoleFiltration,
    page: number,
    itemsPerPage: number
  ): Promise<IGetProducts> {
    const url = `${this.baseUrl}/products/filtration?page=${page}&itemsPerPage=${itemsPerPage}`;


    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'data': encodeURIComponent(JSON.stringify(data))
      }
    })
    .then((data) => data.json())
    .then(({products, productsLength}: IGetProductsResponse): IGetProducts => ({
      products: products.map((el: IProductResponse): IProduct => this.httpProductService.convertProduct(el)),
      productsLength
    }))

  }

  public allProductsWithPagination(
    page: number,
    itemsPerPage: number
  ): Promise<IGetProducts> {
    const url = `${this.baseUrl}/products/all-and-pagination?page=${page}&itemsPerPage=${itemsPerPage}`;

    return fetch(url)
    .then((data) => data.json())
    .then(({products, productsLength}: IGetProductsResponse): IGetProducts => ({
      products: products.map((el: IProductResponse): IProduct => this.httpProductService.convertProduct(el)),
      productsLength
    }))

  }

}
