import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class OrderBasketService {

  orderBasketConfig: MatDialogConfig = {
    maxWidth: '800px',
    panelClass: 'full-with-dialog',
  }

  public scroll(el: HTMLElement){
    el.scrollIntoView({behavior: 'smooth'});
  }
}
