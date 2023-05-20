import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { ICalculatorChar } from 'src/app/modules/admin/interfaces/calculator-char.interface';

@Component({
  selector: 'dsf-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent{

  @Input() public product!: IProduct | null;

  public convertingToString(arr: ICalculatorChar[]): string[]{
    const clearArr = arr.filter((el) => el.name !== '--- Оберіть ---');
    switch(true){
      case clearArr.length === 0:
        return ['Інформація відсутня'];
      case clearArr.length !== 0:
        return clearArr.map((el) => el.name);
      default:
        return clearArr.map((el) => el.name);
    }
  }
}
