import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IProduct } from '../../share/interfaces/common/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productSubject: Subject<IProduct> = new Subject();
  product$: Observable<IProduct> = this.productSubject.asObservable();

  initReloadProducts: Subject<string> = new Subject();
  initReloadProducts$: Observable<string> = this.initReloadProducts.asObservable();

}
