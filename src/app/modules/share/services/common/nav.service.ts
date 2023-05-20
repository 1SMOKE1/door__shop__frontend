import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ScrollConditionEnum } from '../../enums/scroll-condition.enum';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  freeForm: Subject<string | void> = new Subject<string | void>();
  freeForm$: Observable<string | void> = this.freeForm.asObservable();
  freeFormSubscribtion: Subscription;

  constructor(
    private readonly router: Router
  ) {}

  public scroll(el: HTMLElement){
    el.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  public redirectOnMain(){
    this.router.navigate(['store']);
  }

  freeFormStream(condition: string){
    this.freeForm.next(this.redirectOnMain());
    switch(condition){
      case 'zamir':
        setTimeout(() => {
          this.freeForm.next(`${ScrollConditionEnum.SCROLL}-${ScrollConditionEnum.ZAMIR}`);
        }, 500);
        setTimeout(() => {
          this.freeForm.next(`${ScrollConditionEnum.BLIMING}-${ScrollConditionEnum.ZAMIR}`);
        }, 500);
        break;
      case 'consultation':
        setTimeout(() => {
          this.freeForm.next(`${ScrollConditionEnum.SCROLL}-${ScrollConditionEnum.CONSULTATION}`);
        }, 500);
        setTimeout(() => {
          this.freeForm.next(`${ScrollConditionEnum.BLIMING}-${ScrollConditionEnum.CONSULTATION}`);
        }, 500);
        break;
    }
  }


}
