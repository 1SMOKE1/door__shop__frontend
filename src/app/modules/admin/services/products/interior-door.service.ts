import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IInteriorDoorResponse } from 'src/app/modules/share/interfaces/response/interior-door.interface';
import { environment } from 'src/environments/environment.development';
import { IUpdateInteriorDoor } from '../../interfaces/update-interior-door.interface';
import { IInteriorDoor } from 'src/app/modules/share/interfaces/common/interior-door.interface';
import { UpdateInteriorDoorModel } from '../../models/update-interiori-door.model';



@Injectable({
  providedIn: 'root',
})
export class InteriorDoorService {
  baseUrl: string = environment.baseUrl;

  constructor(private readonly http: HttpClient) {}

  public createInteriorDoor(
    body: IUpdateInteriorDoor,
    images: FileList | null
  ): Observable<IInteriorDoor> {
    const url: string = `${this.baseUrl}/interior-door`;

    const formData = this.createFormData(body, images);

    return this.http.post<IInteriorDoorResponse>(url, formData)
    .pipe(
      map((data: IInteriorDoorResponse): IInteriorDoor => this.convertingInteriorDoor(data))
    )
  }

  public updateInteriorDoor(
    body: IUpdateInteriorDoor,
    images: FileList | null
  ): Observable<IInteriorDoor> {

    const url: string = `${this.baseUrl}/interior-door/${body.id}`;

    const formData = this.createFormData(body, images);

    return this.http.patch<IInteriorDoorResponse>(url, formData)
    .pipe(
      map((data: IInteriorDoorResponse): IInteriorDoor => {
        return this.convertingInteriorDoor(data)
      })
    )
  }

  private createFormData(
    product: IUpdateInteriorDoor,
    images: FileList | null
  ): FormData {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('country', product.country);
    formData.append('productProducerName', product.productProducerName);
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
      'fabricMaterialHeight',
      product.fabricMaterialHeight
        ? product.fabricMaterialHeight.toString()
        : ''
    );
    this.convertArr(formData, product, 'fabricMaterialWidth');
    this.convertArr(formData, product, 'doorIsolation');
    this.convertArr(formData, product, 'doorFrameMaterial');
    this.convertArr(formData, product, 'doorSelectionBoard');
    this.convertArr(formData, product, 'doorWelt');
    this.convertArr(formData, product, 'doorSlidingSystem');
    this.convertArr(formData, product, 'doorHand');
    this.convertArr(formData, product, 'doorMechanism');
    this.convertArr(formData, product, 'doorLoops');
    this.convertArr(formData, product, 'doorStopper');
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

  private convertArr(formData: FormData, product: any, field: string) {
    
    
    if (product[`${field}`] && product[`${field}`].length !== 0)
      return product[`${field}`].forEach((item: string) =>
        formData.append(`${field}[]`, item)
      );
    else 
    return formData.append(`${field}[]`, [].toString());
  }

  private convertingInteriorDoor({
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
    fabric_material_height,
    fabric_material_width,
    door_isolation,
    door_frame_material,
    door_selection_board,
    door_welt,
    door_hand,
    door_mechanism,
    door_loops,
    door_stopper,
    door_sliding_system,
    description,
    home_page,
    images,
  }: IInteriorDoorResponse): IInteriorDoor{
    return new UpdateInteriorDoorModel(
      id,
      name,
      product_producer!.name,
      type_of_product.name,
      country,
      guarantee,
      +price,
      in_stock,
      fabric_material_thickness ? +fabric_material_thickness : 0,
      fabric_material_height ? +fabric_material_height : 0,
      fabric_material_width,
      door_isolation,
      door_frame_material,
      door_selection_board,
      door_welt ? door_welt : [],
      door_hand ? door_hand : [],
      door_mechanism ? door_mechanism : [],
      door_loops ? door_loops : [],
      door_stopper ? door_stopper : [],      
      door_sliding_system,
      description,
      home_page,
      images
    );
  }
}
