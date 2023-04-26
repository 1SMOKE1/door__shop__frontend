import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProduct } from '../interfaces/common/product.interface';
import { IGetProducts } from '../interfaces/common/get-products.interface';
import { IProductResponse } from '../interfaces/response/product.interface';
import { ProductModel } from '../models/product.model';
import { ProductProducerModel } from '../models/product-producer.model';
import { TypeOfProductEnum } from '../enums/type-of-product.enum';

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

  public getProduct(id: number, typeOfProductName: string): Observable<IProduct>{
    const url: string = `${this.baseUrl}/products/${id}?typeOfProduct=${typeOfProductName}`;

    return this.http.get<IProductResponse>(url)
    .pipe(
      map((el: IProductResponse): IProduct => this.convertProduct(el))
    );
  }

  public getHttpProducts(): Observable<IProduct[]>{
    const url: string = `${this.baseUrl}/products`;

    return this.http.get<IProductResponse[]>(url)
    .pipe(
      this.convertProducts()
    );
  }

  

  public convertProducts(): OperatorFunction<IProductResponse[], IProduct[]> {
    return map((el: IProductResponse[]): IProduct[] => el.map((el: IProductResponse): IProduct => this.convertProduct(el)))
  }

  public convertProduct({
    id, product_producer, type_of_product, name,
    country, guarantee, state, price,
    installation_price, in_stock, description,
    amount_of_sealing_materials, fabric_material, purpose,
    covering, frame_material, profile, construction, glass_unit,
    lamination, glasses, finishing_the_surface, structural_features,
    opening_type, installation_type, opening_method, home_page,
    images
  }: IProductResponse): IProduct{
    return new ProductModel(
      id, 
      product_producer != null ?
      new ProductProducerModel(product_producer.id, product_producer.name, type_of_product)
      : null,
      type_of_product, name, country, guarantee,
      state, +price, +installation_price, in_stock,
      description,
      amount_of_sealing_materials ? amount_of_sealing_materials : null,
      fabric_material ? fabric_material : null,
      purpose ? purpose : null,
      covering ? covering : null,
      frame_material ? frame_material : null,
      profile ? profile : null,
      construction ? construction : null,
      glass_unit ? glass_unit : null,
      lamination ? lamination : null,
      glasses ? glasses : null,
      finishing_the_surface ? finishing_the_surface : null,
      structural_features ? structural_features : null,
      opening_type ? opening_type : null,
      installation_type ? installation_type : null,
      opening_method ? opening_method : null,
      home_page,
      images
    )
  }


}
