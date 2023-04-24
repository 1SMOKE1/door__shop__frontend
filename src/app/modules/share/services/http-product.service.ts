import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProduct } from '../interfaces/common/product.interface';
import { IGetProducts } from '../interfaces/common/get-products.interface';
import { IProductResponse } from '../interfaces/response/product.interface';
import { ProductModel } from '../models/product.model';
import { ProductProducerModel } from '../models/product-producer.model';

@Injectable({
  providedIn: 'root',
})
export class HttpProductService {
  baseUrl: string = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  public getProducts(): Observable<IGetProducts> {
    return this.getHttpProducts().pipe(
      map((products: IProduct[]): IGetProducts => ({products, productsLength: products.length}))
    )
  }

  private getHttpProducts(): Observable<IProduct[]>{
    const url: string = `${this.baseUrl}/products`;

    return this.http.get<IProductResponse[]>(url)
    .pipe(
      this.convertProducts()
    )
  }

 

  public convertProducts(): OperatorFunction<IProductResponse[], IProduct[]> {
    return map((el: IProductResponse[]): IProduct[] => 
    el.map(({
      id,
      product_producer,
      type_of_product,
      name,
      country,
      guarantee,
      state,
      price,
      installation_price,
      in_stock,
      description,
      amount_of_sealing_materials,
      fabric_material,
      purpose,
      covering,
      frame_material,
      profile,
      construction,
      glass_unit,
      lamination,
      glasses,
      finishing_the_surface,
      structural_features,
      opening_type,
      installation_type,
      opening_method,
      home_page,
      images
    }: IProductResponse): IProduct => 
      new ProductModel(
        id,
        product_producer != null ?
        new ProductProducerModel(product_producer.id, product_producer.name, product_producer.type_of_product)
        : null,
        type_of_product,
        name,
        country,
        guarantee,
        state,
        price,
        installation_price,
        in_stock,
        description,
        amount_of_sealing_materials,
        fabric_material,
        purpose,
        covering,
        frame_material,
        profile,
        construction,
        glass_unit,
        lamination,
        glasses,
        finishing_the_surface,
        structural_features,
        opening_type,
        installation_type,
        opening_method,
        home_page,
        images
      )))
  }


}
