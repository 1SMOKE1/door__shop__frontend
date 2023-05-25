import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IFurniture } from 'src/app/modules/share/interfaces/common/furniture.interface';
import { environment } from 'src/environments/environment.development';
import { IUpdateFurniture } from '../../interfaces/update-furniture.interface';
import { IFurnitureResponse } from 'src/app/modules/share/interfaces/response/furniture.interface';
import { UpdateFurnitureModel } from '../../models/update-furniture.model';
import { ProductClass } from '../../utils/product.class';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService extends ProductClass{

  baseUrl: string = `${environment.baseUrl}/furniture`;

  constructor(
    private readonly http: HttpClient
  ) {
    super();
   }

  public getAllFurniture(): Observable<IFurniture[]>{
    const url: string = this.baseUrl;
    return this.http.get<IFurnitureResponse[]>(url)
    .pipe(
      map((data: IFurnitureResponse[]): IFurniture[] => 
        data.map((el) => this.convertingFurniture(el)) )
    )
  }

  public createFurniture(body: IUpdateFurniture, images: FileList | null): Observable<IFurniture>{
    const url: string = this.baseUrl;

    const formData = this.createFormData(body, images);

    return this.http.post<IFurnitureResponse>(url, formData)
    .pipe(
      map((data: IFurnitureResponse): IFurniture => this.convertingFurniture(data))
    )
  }

  public updateFurniture(body: IUpdateFurniture, images: FileList | null): Observable<IFurniture>{
    const url: string = this.baseUrl;

    const formData = this.createFormData(body, images);

    return this.http.put<IFurnitureResponse>(url, formData)
    .pipe(
      map((data: IFurnitureResponse): IFurniture => this.convertingFurniture(data))
    )
  }

  public deleteFurniture(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }

  private createFormData(
    product: IUpdateFurniture,
    images: FileList | null
  ): FormData {
    const formData = new FormData();

    let productProducerName: string = '';

    if(product.productProducerName !== null && product.productProducerName !== this.noProductProducer.name)
      productProducerName = product.productProducerName;

    formData.append('name', product.name);
    formData.append('country', product.country);
    formData.append('productProducerName', productProducerName);
    formData.append('typeOfProductName', product.typeOfProductName);
    formData.append('guarantee', product.guarantee);
    formData.append('price', product.price.toString());
    formData.append('inStock', product.inStock);
    formData.append(
      'description',
      product.description ? product.description : ''
    );

    formData.append(
      'homePage',
      product.homePage ? `${product.homePage}` : `${false}`
    );

    if (images)
      for (const element of images) {
        formData.append('images', element);
      }

    return formData;
  }

  private convertingFurniture({
    id,
    product_producer,
    type_of_product,
    name,
    country,
    guarantee,
    price,
    in_stock,
    description,
    home_page,
    images,
  }: IFurnitureResponse): IFurniture {
    return new UpdateFurnitureModel(
      id,
      name,
      product_producer !== null ? product_producer.name : null,
      type_of_product.name,
      country,
      guarantee,
      +price,
      in_stock,
      description,
      home_page,
      images,
    )
  }
}
