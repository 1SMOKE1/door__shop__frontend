import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUpdateEntranceDoor } from '../../interfaces/update-entrance-door.interface';
import { Observable, map } from 'rxjs';
import { IEntranceDoor } from 'src/app/modules/share/interfaces/common/entrance-door.interface';
import { ProductsService } from '../products.service';
import { IEntranceDoorResponse } from 'src/app/modules/share/interfaces/response/entrance-door.interface';
import { UpdateEntranceDoorModel } from '../../models/update-entrance-door.model';
import { ProductClass } from '../../utils/product.class';

@Injectable({
  providedIn: 'root'
})
export class EntranceDoorService extends ProductClass{

  baseUrl: string = `${environment.baseUrl}/entrance-door`;

  constructor(
    private readonly http: HttpClient,
    private readonly productsService: ProductsService
  ){
    super();
  }

  public createEntranceDoor(
    body: IUpdateEntranceDoor,
    images: FileList | null
  ): Observable<IEntranceDoor> {
    const url: string = this.baseUrl;

    

    const formData = this.createFormData(body, images);

    return this.http.post<IEntranceDoorResponse>(url, formData)
    .pipe(
      map((data: IEntranceDoorResponse): IEntranceDoor => this.convertingEntranceDoor(data))
    )
  }

  public updateEntranceDoor(
    body: IUpdateEntranceDoor,
    images: FileList | null
  ): Observable<IEntranceDoor> {
    const url: string = `${this.baseUrl}/${body.id}`;

    const formData = this.createFormData(body, images);

    return this.http.patch<IEntranceDoorResponse>(url, formData)
    .pipe(
      map((data: IEntranceDoorResponse): IEntranceDoor => this.convertingEntranceDoor(data))
    )
  }

  public deleteEntranceDoor(id: number): Observable<string>{

    const url: string = `${this.baseUrl}/${id}`

    return this.http.delete<string>(url);
  }

  public deleteAllEntranceDoors(): Observable<string>{
    const url: string = this.baseUrl;

    return this.http.delete<string>(url);
  }

  private createFormData(
    product: IUpdateEntranceDoor,
    images: FileList | null
  ): FormData {
    const formData = new FormData();

    let productProducerName: string = '';

    if(product.productProducerName !== null && product.productProducerName !== this.noProductProducer.name)
      productProducerName = product.productProducerName;

    formData.append('name', product.name);
    formData.append('country', product.country);
    formData.append('productProducerName', productProducerName)
    formData.append('typeOfProductName', product.typeOfProductName);
    formData.append('guarantee', product.guarantee);
    formData.append('price', product.price.toString());
    formData.append('inStock', product.inStock);
    formData.append(
      'description',
      product.description ? product.description : ''
    );
    formData.append(
      'fabricMaterialThickness',
      product.fabricMaterialThickness
        ? product.fabricMaterialThickness.toString()
        : ''
    );

    formData.append(
      'frameMaterialThickness',
      product.frameMaterialThickness
        ? product.frameMaterialThickness.toString()
        : ''
    );
    this.productsService.convertArr(formData, product, 'doorInsulation');
    this.productsService.convertArr(formData, product, 'covering');
    formData.append(
      'doorPeephole',
      product.doorPeephole ? `${product.doorPeephole}` : `${false}`
    );
    this.productsService.convertArr(formData, product, 'openingType');
    this.productsService.convertArr(formData, product, 'size');
    this.productsService.convertArr(formData, product, 'lowerLock');
    this.productsService.convertArr(formData, product, 'upperLock');
    this.productsService.convertArr(formData, product, 'weight');
    this.productsService.convertArr(formData, product, 'doorHand');
    formData.append(
      'metalThickness',
      product.metalThickness
        ? product.metalThickness.toString()
        : ''
    );
    this.productsService.convertArr(formData, product, 'frameMaterialConstruction');
    this.productsService.convertArr(formData, product, 'sealerCircuit');


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

  private convertingEntranceDoor({
    id,
    product_producer,
    type_of_product,
    name,
    country,
    guarantee,
    price,
    in_stock,
    //
    fabric_material_thickness,
    frame_material_thisckness,
    door_insulation,
    covering,
    door_peephole,
    opening_type,
    size,
    lower_lock,
    upper_lock,
    door_hand,
    weight,
    metal_thickness,
    frame_material_constuction,
    sealer_circuit,
    description,
    home_page,
    images
  }: IEntranceDoorResponse): IEntranceDoor{
    return new UpdateEntranceDoorModel(
      id,
      name,
      product_producer !== null ? product_producer.name : null,
      type_of_product.name,
      country,
      guarantee,
      +price,
      in_stock,
      fabric_material_thickness ? +fabric_material_thickness : 0,
      frame_material_thisckness ? +frame_material_thisckness : 0,
      door_insulation,
      covering,
      door_peephole,
      opening_type,
      size,
      lower_lock,
      upper_lock,
      door_hand,
      weight,
      metal_thickness,
      frame_material_constuction,
      sealer_circuit,
      description,
      home_page,
      images
    );
  }

}
