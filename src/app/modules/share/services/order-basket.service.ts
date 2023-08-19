import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ICreateOrder } from '@share-interfaces/common/order.interface';
import { environment } from '@environments/environment';
import { IOrderResponse } from '@share-interfaces/response/order.interface';
import CreateOrderModel from '@share-models/create-order.model';
import { OrderBasketSubmitEnum } from '@share-enums/order-basket-submit.enum';

@Injectable({
  providedIn: 'root',
})
export class OrderBasketService {
  private baseUrl: string = `${environment.baseUrl}/orders`;

  submitingOrderSubject: BehaviorSubject<any> = new BehaviorSubject(
    OrderBasketSubmitEnum.noSubmit
  );
  submitingOrder$: Observable<OrderBasketSubmitEnum> =
    this.submitingOrderSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  public getOrders(): Observable<ICreateOrder[]> {
    const url: string = this.baseUrl;

    return this.http
      .get<IOrderResponse[]>(url)
      .pipe(
        map((el: IOrderResponse[]): ICreateOrder[] =>
          el.map(
            (item: IOrderResponse): ICreateOrder => this.convertOrder(item)
          )
        )
      );
  }

  public createOrder(newOrder: ICreateOrder): Observable<ICreateOrder> {
    const url: string = this.baseUrl;

    const newOrderCopy = structuredClone(newOrder);
    const clearOrder = this.clearEmptyFieldsFromProduct(newOrderCopy);

    return this.http
      .post<IOrderResponse>(url, clearOrder)
      .pipe(map((el: IOrderResponse): ICreateOrder => this.convertOrder(el)));
  }

  public convertOrder({
    id,
    name,
    phone,
    email,
    address,
    cart_lines,
    shiped,
    total_cost,
    kind_of_payment,
  }: IOrderResponse): ICreateOrder {
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
    );
  }

  public compliteOrder(updatedOrder: ICreateOrder): Observable<ICreateOrder> {
    const url: string = `${this.baseUrl}/${updatedOrder.id}`;

    return this.http
      .put<IOrderResponse>(url, updatedOrder)
      .pipe(map((el: IOrderResponse): ICreateOrder => this.convertOrder(el)));
  }

  public deleteOrder(id: number): Observable<string> {
    const url: string = `${this.baseUrl}/${id}`;

    return this.http
      .delete<string>(url);
  }

  private clearEmptyFieldsFromProduct(newOrder: ICreateOrder): ICreateOrder{

    newOrder.cartLines.map(({product}: any) => {
      const entries: any[] = Object.entries(product);

      entries.forEach(([key, value]) => {
        switch(true){
          case (value === null || (typeof value === 'object' && (value as unknown as Array<string>).length === 0)):
            delete product[key];
            break;
          case (typeof value === 'number' && (value as unknown as number) === 0):
            delete product[key];
            break;
          case (key === 'chooseConst'):
            delete product[key];
        }
       
      });
    })
    return newOrder
  }
}
