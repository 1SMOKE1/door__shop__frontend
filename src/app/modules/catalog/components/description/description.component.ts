import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConvertingOrderFieldsClass } from '@modules/admin/utils/converting-order-fields.class';
import { ProductService } from '../../services/product.service';
import { IProduct } from '@modules/share/interfaces/common/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsf-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent
  extends ConvertingOrderFieldsClass
  implements OnInit, OnDestroy
{
  product: IProduct | undefined;
  productSubscription: Subscription;

  constructor(public readonly productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.productSubscription = this.productService.product$.subscribe((product: IProduct) => {
      this.product = product;
    });
  }

  ngOnDestroy(): void{
    this.productSubscription.unsubscribe();
  }
}
