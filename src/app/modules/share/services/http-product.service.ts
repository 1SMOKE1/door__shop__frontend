import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, map } from 'rxjs';
import { environment } from '@environments/environment';
import { IProduct } from '@share-interfaces/common/product.interface';
import { IGetProducts } from '@share-interfaces/common/get-products.interface';
import { IProductResponse } from '@share-interfaces/response/product.interface';
import { ProductModel } from '@share-models/product.model';
import { ProductProducerModel } from '@share-models/product-producer.model';
import { ConvertingProductClass } from 'app/modules/admin/utils/converting-product.class';

@Injectable({
  providedIn: 'root',
})
export class HttpProductService extends ConvertingProductClass {
  private baseUrl: string = environment.baseUrl;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public getProducts(): Observable<IGetProducts> {
    return this.getHttpProducts().pipe(
      map(
        (products: IProduct[]): IGetProducts => ({
          products,
          productsLength: products.length,
        })
      )
    );
  }

  public getProduct(
    id: number,
    typeOfProductName: string
  ): Observable<IProduct> {
    const url: string = `${this.baseUrl}/products/${id}?typeOfProduct=${typeOfProductName}`;

    return this.http
      .get<IProductResponse>(url)
      .pipe(map((el: IProductResponse): IProduct => this.convertProduct(el)));
  }

  public getHttpProducts(): Observable<IProduct[]> {
    const url: string = `${this.baseUrl}/products`;

    return this.http.get<IProductResponse[]>(url).pipe(this.convertProducts());
  }

  public convertProducts(): OperatorFunction<IProductResponse[], IProduct[]> {
    return map((el: IProductResponse[]): IProduct[] =>
      el.map((el: IProductResponse): IProduct => this.convertProduct(el))
    );
  }

  public convertProduct({
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
    //
    frame_material_thickness,
    door_insulation,
    covering,
    door_peephole,
    opening_type,
    size,
    lower_lock,
    upper_lock,
    weight,
    metal_thickness,
    frame_material_construction,
    sealer_circuit,
    //
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
  }: IProductResponse): IProduct {
    return new ProductModel(
      id,
      product_producer != null
        ? new ProductProducerModel(
            product_producer.id,
            product_producer.name,
            type_of_product,
            false
          )
        : null,
      type_of_product,
      name,
      country,
      guarantee,
      this.convertNumber(price),
      in_stock,
      //
      fabric_material_thickness
        ? this.convertNumber(fabric_material_thickness)
        : 0,
      fabric_material_height ? this.convertNumber(fabric_material_height) : 0,
      fabric_material_width
        ? this.convertCalculatorChar(fabric_material_width)
        : [],
      door_isolation ? this.convertCalculatorChar(door_isolation) : [],
      door_frame_material
        ? this.convertCalculatorChar(door_frame_material)
        : [],
      door_selection_board
        ? this.convertCalculatorChar(door_selection_board)
        : [],
      door_welt ? this.convertCalculatorChar(door_welt) : [],
      door_hand ? this.convertCalculatorChar(door_hand) : [],
      door_mechanism ? this.convertCalculatorChar(door_mechanism) : [],
      door_loops ? this.convertCalculatorChar(door_loops) : [],
      door_stopper ? this.convertCalculatorChar(door_stopper) : [],
      door_sliding_system
        ? this.convertCalculatorChar(door_sliding_system)
        : [],
      //
      frame_material_thickness
        ? this.convertNumber(frame_material_thickness)
        : 0,
      door_insulation ? this.convertCalculatorChar(door_insulation) : [],
      covering ? this.convertCalculatorChar(covering) : [],
      door_peephole ? door_peephole : false,
      opening_type ? this.convertCalculatorChar(opening_type) : [],
      size ? this.convertCalculatorChar(size) : [],
      lower_lock ? this.convertCalculatorChar(lower_lock) : [],
      upper_lock ? this.convertCalculatorChar(upper_lock) : [],
      weight ? this.convertCalculatorChar(weight) : [],
      metal_thickness ? this.convertNumber(metal_thickness) : 0,
      frame_material_construction
        ? this.convertCalculatorChar(frame_material_construction)
        : [],
      sealer_circuit ? this.convertCalculatorChar(sealer_circuit) : [],
      //
      mosquito_net ? this.convertCalculatorChar(mosquito_net) : [],
      window_sill ? this.convertCalculatorChar(window_sill) : [],
      window_ebb ? this.convertCalculatorChar(window_ebb) : [],
      window_hand ? this.convertCalculatorChar(window_hand) : [],
      child_lock ? this.convertCalculatorChar(child_lock) : [],
      housewife_stub ? this.convertCalculatorChar(housewife_stub) : [],
      glass_pocket_add ? this.convertCalculatorChar(glass_pocket_add) : [],
      lamination ? this.convertCalculatorChar(lamination) : [],
      profile ? this.convertCalculatorChar(profile) : [],
      window_width ? this.convertNumber(window_width) : 0,
      window_height ? this.convertNumber(window_height) : 0,
      cameras_count ? this.convertCalculatorChar(cameras_count) : [],
      features ? this.convertCalculatorChar(features) : [],
      sections_count ? this.convertCalculatorChar(sections_count) : [],
      description ? description : '',
      home_page ? home_page : false,
      images ? images : []
    );
  }
}
