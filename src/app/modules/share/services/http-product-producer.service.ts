import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IProductProducer } from '../interfaces/common/product-producer.interface';
import { Observable, map } from 'rxjs';
import { TypeOfProductEnum } from '../enums/type-of-product.enum';
import { IProductProducerResponse } from '../interfaces/response/product-producer.interface';
import { ProductProducerModel } from '../models/product-producer.model';


@Injectable({
  providedIn: 'root',
})
export class HttpProductProducerService {
  baseUrl: string = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  public getProductProducers(): Observable<IProductProducerResponse[]> {
    const url: string = `${this.baseUrl}/product-producers`;

    return this.http.get<IProductProducerResponse[]>(url);
  }

  public getProductProducer(id: string): Observable<IProductProducerResponse> {
    const url: string = `${this.baseUrl}/product-producers/${id}`;

    return this.http.get<IProductProducerResponse>(url);
  }

  public createProductProducer(productProducer: IProductProducer): Observable<IProductProducerResponse> {
    const url: string = `${this.baseUrl}/product-producers`;

    return this.http.post<IProductProducerResponse>(url, productProducer);
  }

  public updateProductProducer(productProducer: IProductProducer): Observable<IProductProducerResponse> {
    const url: string = `${this.baseUrl}/product-producers/${productProducer.id}`;

    return this.http.put<IProductProducerResponse>(url, productProducer);
  }

  public deleteProductProducer(id: string): Observable<IProductProducer> {
    const url: string = `${this.baseUrl}/product-producers/${id}`;

    return this.http.delete<IProductProducer>(url);
  }

  public getEntranceDoorProductProducers(): Observable<IProductProducer[]> {
    return this.getCustomProductProducers(TypeOfProductEnum.entranceDoor);
  }

  public getInteriorDoorProductProducers(): Observable<IProductProducer[]> {
    return this.getCustomProductProducers(TypeOfProductEnum.interiorDoor);
  }

  public getFurnitureProductProducers(): Observable<IProductProducer[]>{
    return this.getCustomProductProducers(TypeOfProductEnum.furniture);
  }

  public getWindowProductProducers(): Observable<IProductProducer[]>{
    return this.getCustomProductProducers(TypeOfProductEnum.windows);
  }

  private getCustomProductProducers(condition: string): Observable<IProductProducer[]> {
    return this.getProductProducers().pipe(
      map((el: IProductProducerResponse[]) => 
        el.filter((el: IProductProducerResponse) => 
          el.type_of_product.name === condition
          )),
      map((el: IProductProducerResponse[]) => 
       el.map((el: IProductProducerResponse): IProductProducer => 
        new ProductProducerModel(el.id, el.name, {id: el.type_of_product.id, name: el.type_of_product.name})
        )
      )
    );
  }


}
