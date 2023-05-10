import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from 'src/app/modules/share/components/order-basket/order-basket/order-basket.component';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { CartLineService } from 'src/app/modules/share/services/common/cart-line.service';
import { HttpProductService } from 'src/app/modules/share/services/common/http-product.service';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalculatorChar } from 'src/app/modules/admin/interfaces/calculator-char.interface';

@Component({
  selector: 'dsf-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {

  chooseConst: ICalculatorChar = {name: '--- Оберіть ---', price: 0}
  product: IProduct | null = null;
  TypeOfProductEnum: TypeOfProductEnum;

  selectedFabricMaterialWidth: ICalculatorChar = this.chooseConst;
  selectedFrameMaterial: ICalculatorChar = this.chooseConst;
  selectedDoorSelectionBoard: ICalculatorChar = this.chooseConst;
  selectedDoorWelt: ICalculatorChar = this.chooseConst;
  selectedDoorHand: ICalculatorChar = this.chooseConst;
  selectedDoorMechanism: ICalculatorChar = this.chooseConst;
  selectedDoorLoops: ICalculatorChar = this.chooseConst;
  selectedDoorStopper: ICalculatorChar = this.chooseConst;
  selectedDoorSlidingSystem: ICalculatorChar = this.chooseConst;

  constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpProductService: HttpProductService,
    private readonly cartLineService: CartLineService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap.get('id');
    const query = this.route.snapshot.queryParamMap.get(
      'typeOfProduct'
    ) as TypeOfProductEnum;
    if (params && query) this.initProduct(+params, query);

  }

  toBasket(): void {
    this.dialog.open(OrderBasketComponent, {
      data: {
        product: this.product,
      },
    });
    if (this.product) this.cartLineService.addCartLine(this.product);
  }

  private initProduct(id: number, typeOfProductName: TypeOfProductEnum) {
    this.httpProductService
      .getProduct(id, typeOfProductName)
      .subscribe({
        next: (product: IProduct) => {
          this.product = product;
          this.product.fabricMaterialWidth = [this.chooseConst, ...this.product.fabricMaterialWidth];
          this.product.doorFrameMaterial = [this.chooseConst, ...this.product.doorFrameMaterial];
          this.product.doorSelectionBoard = [this.chooseConst, ...this.product.doorSelectionBoard];
          this.product.doorWelt = [this.chooseConst, ...this.product.doorWelt];
          this.product.doorHand = [this.chooseConst, ...this.product.doorHand];
          this.product.doorMechanism = [this.chooseConst, ...this.product.doorMechanism];
          this.product.doorLoops = [this.chooseConst, ...this.product.doorLoops];
          this.product.doorStopper = [this.chooseConst, ...this.product.doorStopper];
          this.product.doorSlidingSystem = [this.chooseConst, ...this.product.doorSlidingSystem];
        },
        error: () => this.router.navigate(['store', 'page-not-found'])
      });
  }



}
