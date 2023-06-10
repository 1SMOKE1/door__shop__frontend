import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ProductsService } from '../products.service';
import { IUpdateWindow } from '../../interfaces/update-window.interface';
import { IWindow } from '@modules/share/interfaces/common/window.interface';
import { Observable, map } from 'rxjs';
import { IWindowResponse } from '@modules/share/interfaces/response/window.interface';
import { UpdateWindowModel } from '../../models/update-window.model';
import { ProductClass } from '../../utils/product.class';

@Injectable({
  providedIn: 'root',
})
export class WindowService extends ProductClass {
  baseUrl: string = `${environment.baseUrl}/window`;

  constructor(
    private readonly http: HttpClient,
    private readonly productsService: ProductsService
  ) {
    super();
  }

  public createWindow(
    body: IUpdateWindow,
    images: FileList | null
  ): Observable<IWindow> {
    const url: string = this.baseUrl;

    const formData = this.createFormData(body, images);

    return this.http
      .post<IWindowResponse>(url, formData, this.headersForFormData)
      .pipe(
        map((data: IWindowResponse): IWindow => this.convertingWindow(data))
      );
  }

  public updateWindow(
    body: IUpdateWindow,
    images: FileList | null
  ): Observable<IWindow> {
    const url: string = `${this.baseUrl}/${body.id}`;

    const formData = this.createFormData(body, images);

    return this.http
      .patch<IWindowResponse>(url, formData, this.headersForFormData)
      .pipe(
        map((data: IWindowResponse): IWindow => this.convertingWindow(data))
      );
  }

  public deleteWindow(id: number): Observable<string> {
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }

  public deleteAllWindows(): Observable<string> {
    const url: string = this.baseUrl;

    return this.http.delete<string>(url);
  }

  private createFormData(
    product: IUpdateWindow,
    images: FileList | null
  ): FormData {
    const formData = new FormData();

    let productProducerName: string = '';

    if (
      product.productProducerName !== null &&
      product.productProducerName !== this.noProductProducer.name
    )
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
    this.productsService.convertArr(formData, product, 'mosquitoNet');
    this.productsService.convertArr(formData, product, 'windowSill');
    this.productsService.convertArr(formData, product, 'windowEbb');
    this.productsService.convertArr(formData, product, 'windowHand');
    this.productsService.convertArr(formData, product, 'childLock');
    this.productsService.convertArr(formData, product, 'housewifeStub');
    this.productsService.convertArr(formData, product, 'glassPocketAdd');
    this.productsService.convertArr(formData, product, 'lamination');
    this.productsService.convertArr(formData, product, 'profile');
    formData.append(
      'windowWidth',
      product.windowWidth ? product.windowWidth.toString() : ''
    );
    formData.append(
      'windowHeight',
      product.windowHeight ? product.windowHeight.toString() : ''
    );
    this.productsService.convertArr(formData, product, 'camerasCount');
    this.productsService.convertArr(formData, product, 'features');
    this.productsService.convertArr(formData, product, 'sectionCount');

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

  private convertingWindow({
    id,
    product_producer,
    type_of_product,
    name,
    country,
    guarantee,
    price,
    in_stock,
    mosquito_net,
    window_sill,
    window_ebb,
    window_hand,
    child_lock,
    housewife_stub,
    glass_pocket_add,
    lamination,
    profile,
    window_width,
    window_height,
    cameras_count,
    features,
    sections_count,
    description,
    home_page,
    images,
  }: IWindowResponse): IWindow {
    return new UpdateWindowModel(
      id,
      name,
      product_producer !== null ? product_producer.name : null,
      type_of_product.name,
      country,
      guarantee,
      +price,
      in_stock,
      mosquito_net,
      window_sill,
      window_ebb,
      window_hand,
      child_lock,
      housewife_stub,
      glass_pocket_add,
      lamination,
      profile,
      window_width ? +window_width : 0,
      window_height ? +window_height : 0,
      cameras_count,
      features,
      sections_count,
      description,
      home_page,
      images
    );
  }
}
