import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, interval, map } from 'rxjs';
import { IGetProducts } from '@modules/share/interfaces/common/get-products.interface';
import { IProduct } from '@modules/share/interfaces/common/product.interface';
import { CardService } from '../../services/card.service';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { SidebarService } from '@share-services/sidebar.service';
import { SpinnerService } from '@share-services/spinner.service';

@Component({
  selector: 'dsf-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  filtrationSubsctiption!: Subscription;

  page: number = 1; // currentPage
  itemsPerPage: number = 8;
  productsLength: number = 0;
  products: IProduct[] = [];

  emptyProducts: boolean = false;

  constructor(
    public readonly spinnerService: SpinnerService,
    private readonly cardService: CardService,
    private readonly sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.getFilteredProducts();
    this.filtrationSubsctiption = this.sidebarService.filtration$
      .pipe(
        map((el: IGetProducts) => {
          this.emptyProducts = false;
          this.products = [];
          this.spinnerService.spinnerSubscription = interval(10).subscribe(
            (value: number) => {
              this.spinnerService.spinnerValue += value;
            }
          );
          return el;
        }),
        delay(1000)
      )
      .subscribe(({ products, productsLength }: IGetProducts) => {
        this.products = products;
        this.productsLength = productsLength;
        if (products.length == 0) this.emptyProducts = true;
        else this.emptyProducts = false;
        this.spinnerService.spinnerSubscription.unsubscribe();
        this.spinnerService.spinnerValue = 0;
      });
  }

  ngOnDestroy(): void {
    this.filtrationSubsctiption.unsubscribe();
    this.sidebarService.checkBoxArr = [];
    this.spinnerService.spinnerSubscription.unsubscribe();
  }

  public cardBigRedirect(
    id: number,
    typeOfProductName: TypeOfProductEnum
  ): void {
    this.cardService.cardInfoRedirect(id, typeOfProductName);
  }

  public changePage(page: number) {
    this.page = page;
    this.getFilteredProducts(page ? page : 1);
  }

  public getFilteredProducts(page?: number) {
    this.sidebarService.doFiltration(page ? page : 1, this.itemsPerPage);
  }
}
