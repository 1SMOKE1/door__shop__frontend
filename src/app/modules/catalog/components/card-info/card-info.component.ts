import { Component } from '@angular/core';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';

@Component({
  selector: 'dsf-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {

  product: IProduct | null = null;
  prodId: string = '';
  photoArr: string[] = ['', '', '', ''];

  toBasket(): void{}
}
