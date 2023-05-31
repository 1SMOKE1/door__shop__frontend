import { Component, OnInit } from '@angular/core';
import { ConvertingOrderFieldsClass } from 'src/app/modules/admin/utils/converting-order-fields.class';
import { ProductService } from '../../services/product.service';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';


@Component({
  selector: 'dsf-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent extends ConvertingOrderFieldsClass implements OnInit{

  product: IProduct | undefined;

  constructor(
    public readonly productService: ProductService
  ){
    super();
  }

  ngOnInit(): void {
    this.productService
    .product$
    .subscribe((product: IProduct) => {
      this.product = product;
    })
  }

}
