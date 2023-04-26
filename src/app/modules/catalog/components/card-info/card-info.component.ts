import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from 'src/app/modules/share/components/order-basket/order-basket/order-basket.component';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { CartLineService } from 'src/app/modules/share/services/cart-line.service';
import { OrderBasketService } from 'src/app/modules/share/services/order-basket.service';
import { HttpProductService } from 'src/app/modules/share/services/http-product.service';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dsf-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit{

  product: IProduct| null = null;
  prodId: string = '';
  photoArr: string[] = ['', '', '', ''];
  TypeOfProductEnum: TypeOfProductEnum;

  constructor(
    private readonly dialog: MatDialog,
    private readonly orderBasketService: OrderBasketService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpProductService: HttpProductService,
    private readonly cartLineService: CartLineService
  ){}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap.get('id');
    const query = this.route.snapshot.queryParamMap.get('typeOfProduct') as TypeOfProductEnum;
    if(params && query) 
    this.initProduct(+params, query)
  }

  toBasket(): void{
    this.dialog.open(OrderBasketComponent, {
      data: {
        product: this.product
      },
      ...this.orderBasketService.orderBasketConfig
    });
    if(this.product)
    this.cartLineService.addCartLine(this.product);
  }

  private initProduct(id: number, typeOfProductName: TypeOfProductEnum){
    this.httpProductService
    .getProduct(id, typeOfProductName)
    .subscribe((product: IProduct) => {
      this.product = product;
      if(this.product === null)
      this.router.navigate(['store', 'page-not-found'])
    })
  }
}
