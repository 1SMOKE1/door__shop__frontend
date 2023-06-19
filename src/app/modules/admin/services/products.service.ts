import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  initProductProducersSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  initProductProducers$: Observable<boolean> = this.initProductProducersSubject.asObservable();
  initProductProducersSubscription: Subscription;
  
  public convertArr(formData: FormData, product: any, field: string) {
    if (product[`${field}`] && product[`${field}`].length !== 0)
      return product[`${field}`].forEach((item: string) =>
        formData.append(`${field}[]`, item)
      );
    else 
    return formData.append(`${field}[]`, [].toString());
  }
}
