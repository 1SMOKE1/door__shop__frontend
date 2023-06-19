import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TypeOfProductEnum } from '../enums/type-of-product.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectWithFiltrationService {

  redirectWithFiltratioSubject: Subject<TypeOfProductEnum> = new Subject();
  redirectWithFiltration$: Observable<TypeOfProductEnum> = this.redirectWithFiltratioSubject.asObservable();
  redirectWithFiltrationSubscription: Subscription;

  confirmRedirectionSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  confirmRedirection$: Observable<boolean> = this.confirmRedirectionSubject.asObservable();
  confirmRedirectionSubscription: Subscription;

  constructor(
    private readonly router: Router
  ){}

  public scroll(el: HTMLElement){
    el.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  
  public redirectOnCatalog(){
    return this.router.navigate(['store', 'catalog']);
  }

  public redirectWithFiltrationStream(condition: TypeOfProductEnum){
    this.redirectOnCatalog();
    this.confirmRedirectionSubject.next(true);
    setTimeout(() => {
      this.redirectWithFiltratioSubject.next(condition);
    }, 300)
    
    
  }
}
