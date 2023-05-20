import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICreateOrder } from '../../interfaces/common/order.interface';
import { environment } from 'src/environments/environment.development';
import { IOrderResponse } from '../../interfaces/response/order.interface';
import CreateOrderModel from '../../models/create-order.model';



@Injectable({
  providedIn: 'root'
})
export class OrderBasketService {

  private baseUrl: string = `${environment.baseUrl}/orders`;

  constructor(
    private readonly http: HttpClient,
  ){}

  public createOrder(newOrder: ICreateOrder): Observable<ICreateOrder>{
    const url: string = this.baseUrl;

    return this.http.post<IOrderResponse>(url, newOrder)
    .pipe(
      map((el: IOrderResponse): ICreateOrder => this.convertOrder(el)),
    )
  }

  public convertOrder(
    {
      id,
      name,
      phone,
      email,
      address,
      cart_lines,
      shiped,
      total_cost,
      kind_of_payment
    }: IOrderResponse): ICreateOrder{
    return new CreateOrderModel(
      name,
      phone,
      email,
      address,
      cart_lines,
      shiped,
      total_cost,
      kind_of_payment,
      id
    )
  }

  


}
