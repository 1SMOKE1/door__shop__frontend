import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProduct } from '../../interfaces/common/product.interface';
import { IGetProducts } from '../../interfaces/common/get-products.interface';
import { IProductResponse } from '../../interfaces/response/product.interface';
import { ProductModel } from '../../models/product.model';
import { ProductProducerModel } from '../../models/product-producer.model';
import { ICalculatorChar } from 'src/app/modules/admin/interfaces/calculator-char.interface';
import { IFurniture } from '../../interfaces/common/furniture.interface';


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
    country, guarantee, price,
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
    door_covering,
    door_peephole,
    opening_type,
    door_size,
    lower_lock,
    upper_lock,
    door_weight,
    metal_thickness,
    frame_material_construction,
    sealer_circuit,
    // 
    mosquit_net,
    window_sill,
    window_ebb,
    window_hand,
    child_lock,
    housewife_stub,
    glass_pocket_add,
    window_lamination,
    window_profile,
    window_width,
    window_height,
    cameras_count,
    features,
    sections_count,
    description,
    home_page,
    images
    }: IProductResponse): IProduct{
    return new ProductModel(
      id, 
      product_producer != null ?
      new ProductProducerModel(product_producer.id, product_producer.name, type_of_product)
      : null,
      type_of_product, name, country, guarantee,
      +price, in_stock,
      // 
      fabric_material_thickness ? +fabric_material_thickness : 0,
      fabric_material_height ? +fabric_material_height : 0,
      fabric_material_width ? this.convertCalculatorChar(fabric_material_width) : [],
      door_isolation ? this.convertCalculatorChar(door_isolation) : [],
      door_frame_material ? this.convertCalculatorChar(door_frame_material) : [],
      door_selection_board ? this.convertCalculatorChar(door_selection_board) : [],
      door_welt ? this.convertCalculatorChar(door_welt) : [],
      door_hand ? this.convertCalculatorChar(door_hand) : [],
      door_mechanism ? this.convertCalculatorChar(door_mechanism) : [],
      door_loops ? this.convertCalculatorChar(door_loops) : [],
      door_stopper ? this.convertCalculatorChar(door_stopper): [],
      door_sliding_system ? this.convertCalculatorChar(door_sliding_system) : [],
      // 
      frame_material_thickness ? frame_material_thickness : [],
      door_insulation ? door_insulation : [],
      door_covering ? door_covering : [],
      door_peephole ? door_peephole : false,
      opening_type ? opening_type : [],
      door_size ? door_size : [],
      lower_lock ? lower_lock : [],
      upper_lock ? upper_lock : [],
      door_weight ? door_weight : [],
      metal_thickness ? metal_thickness : 0,
      frame_material_construction ? frame_material_construction : [],
      sealer_circuit ? sealer_circuit : [],
      //
      mosquit_net ? mosquit_net : [],
      window_sill ? window_sill : [],
      window_ebb ? window_ebb : [],
      window_hand ? window_hand : [],
      child_lock ? child_lock : [],
      housewife_stub ? housewife_stub : [],
      glass_pocket_add ? glass_pocket_add : [],
      window_lamination ? window_lamination : [],
      window_profile ? window_profile : [],
      window_width ? window_width : 0,
      window_height ? window_height : 0,
      cameras_count ? cameras_count : [],
      features ? features : [],
      sections_count ? sections_count : [],
      
      description ? description : '',
      home_page ? home_page : false,
      images ? images : [],
    )
  }

  private convertCalculatorChar(arr: IFurniture[] | ICalculatorChar[]):ICalculatorChar[] {
    return arr.map((el) => ({name: el.name, price: el.price ? +el.price : 0, id: el.id}));
  } 


}
