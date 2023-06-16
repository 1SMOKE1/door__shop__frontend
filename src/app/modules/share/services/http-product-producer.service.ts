import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IProductProducer } from '@share-interfaces/common/product-producer.interface';
import { Observable, map } from 'rxjs';
import { TypeOfProductEnum } from '@share-enums/type-of-product.enum';
import { IProductProducerResponse } from '@share-interfaces/response/product-producer.interface';
import { ProductProducerModel } from '@share-models/product-producer.model';

@Injectable({
  providedIn: 'root',
})
export class HttpProductProducerService {
  private baseUrl: string = `${environment.baseUrl}/product-producers`;

  constructor(private readonly http: HttpClient) {}

  public getProductProducers(): Observable<IProductProducer[]> {
    const url: string = this.baseUrl;

    return this.http
      .get<IProductProducerResponse[]>(url)
      .pipe(
        map((data: IProductProducerResponse[]): IProductProducer[] =>
          data.map(
            (el: IProductProducerResponse): IProductProducer =>
              this.convertProductProducer(el)
          )
        )
      );
  }

  public getProductProducer(id: string): Observable<IProductProducer> {
    const url: string = `${this.baseUrl}/${id}`;

    return this.http
      .get<IProductProducerResponse>(url)
      .pipe(
        map(
          (data: IProductProducerResponse): IProductProducer =>
            this.convertProductProducer(data)
        )
      );
  }

  public createProductProducer(
    productProducer: IProductProducer
  ): Observable<IProductProducer> {
    const url: string = this.baseUrl;

    return this.http
      .post<IProductProducerResponse>(url, productProducer)
      .pipe(
        map(
          (data: IProductProducerResponse): IProductProducer =>
            this.convertProductProducer(data)
        )
      );
  }

  public updateProductProducer(
    productProducer: IProductProducer
  ): Observable<IProductProducer> {
    const url: string = `${this.baseUrl}/${productProducer.id}`;

    return this.http
      .patch<IProductProducerResponse>(url, productProducer)
      .pipe(
        map(
          (data: IProductProducerResponse): IProductProducer =>
            this.convertProductProducer(data)
        )
      );
  }

  public deleteProductProducer(id: number): Observable<string> {
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }

  public getEntranceDoorProductProducers(): Observable<IProductProducer[]> {
    return this.getCustomProductProducers(TypeOfProductEnum.entranceDoor);
  }

  public getInteriorDoorProductProducers(): Observable<IProductProducer[]> {
    return this.getCustomProductProducers(TypeOfProductEnum.interiorDoor);
  }

  public getFurnitureProductProducers(): Observable<IProductProducer[]> {
    return this.getCustomProductProducers(TypeOfProductEnum.furniture);
  }

  public getWindowProductProducers(): Observable<IProductProducer[]> {
    return this.getCustomProductProducers(TypeOfProductEnum.windows);
  }

  private getCustomProductProducers(
    condition: string
  ): Observable<IProductProducer[]> {
    return this.getProductProducers().pipe(
      map((el: IProductProducer[]) =>
        el.filter((el: IProductProducer) => el.typeOfProduct.name === condition)
      )
    );
  }

  private convertProductProducer({
    id,
    name,
    type_of_product,
  }: IProductProducerResponse): IProductProducer {
    return new ProductProducerModel(id, name, {
      id: type_of_product.id,
      name: type_of_product.name,
    });
  }
}
