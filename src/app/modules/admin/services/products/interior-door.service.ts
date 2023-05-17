import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IInteriorDoorResponse } from 'src/app/modules/share/interfaces/response/interior-door.interface';
import { environment } from 'src/environments/environment.development';
import { IUpdateInteriorDoor } from '../../interfaces/update-interior-door.interface';
import { IInteriorDoor } from 'src/app/modules/share/interfaces/common/interior-door.interface';
import { UpdateInteriorDoorModel } from '../../models/update-interiori-door.model';
import { ProductsService } from '../products.service';



@Injectable({
  providedIn: 'root',
})
export class InteriorDoorService {
  baseUrl: string = `${environment.baseUrl}/interior-door`;

  constructor(
    private readonly http: HttpClient,
    private readonly productsService: ProductsService
    ) {}

  public createInteriorDoor(
    body: IUpdateInteriorDoor,
    images: FileList | null
  ): Observable<IInteriorDoor> {
    const url: string = this.baseUrl;

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

    const url: string = `${this.baseUrl}/${body.id}`;

    const formData = this.createFormData(body, images);

    return this.http.patch<IInteriorDoorResponse>(url, formData)
    .pipe(
      map((data: IInteriorDoorResponse): IInteriorDoor => this.convertingInteriorDoor(data))
    )
  }

  public deleteIneriorDoor(id: number): Observable<string> {

    const url: string = `${this.baseUrl}/${id}`

    return this.http.delete<string>(url);
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
    this.productsService.convertArr(formData, product, 'fabricMaterialWidth');
    this.productsService.convertArr(formData, product, 'doorIsolation');
    this.productsService.convertArr(formData, product, 'doorFrameMaterial');
    this.productsService.convertArr(formData, product, 'doorSelectionBoard');
    this.productsService.convertArr(formData, product, 'doorWelt');
    this.productsService.convertArr(formData, product, 'doorSlidingSystem');
    this.productsService.convertArr(formData, product, 'doorHand');
    this.productsService.convertArr(formData, product, 'doorMechanism');
    this.productsService.convertArr(formData, product, 'doorLoops');
    this.productsService.convertArr(formData, product, 'doorStopper');
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
      door_welt,
      door_hand,
      door_mechanism,
      door_loops,
      door_stopper,      
      door_sliding_system,
      description,
      home_page,
      images
    );
  }
}
