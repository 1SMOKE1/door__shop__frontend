import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { ConvertingOrderFieldsClass } from 'src/app/modules/admin/utils/converting-order-fields.class';

@Component({
  selector: 'dsf-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent extends ConvertingOrderFieldsClass{

  @Input() public product!: IProduct | null;

  constructor(){
    super();
  }
}
