import { RedirectWithFiltrationService } from '@modules/share/services/redirect-with-filtration.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, map } from 'rxjs';
import { IGetProducts } from '@modules/share/interfaces/common/get-products.interface';
import { CardService } from '../../services/card.service';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { SidebarService } from '@share-services/sidebar.service';
import { SpinnerService } from '@share-services/spinner.service';
import { CatalogService } from '@modules/catalog/services/catalog.service';

@Component({
  selector: 'dsf-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  filtrationSubsctiption!: Subscription;



  emptyProducts: boolean = false;

  constructor(
    public readonly spinnerService: SpinnerService,
    public readonly sidebarService: SidebarService,
    public readonly catalogService: CatalogService,
    private readonly cardService: CardService,
    private readonly redirectWithFiltrationService: RedirectWithFiltrationService,

  ) {}

  ngOnInit(): void {
    this.redirectWithFiltrationService.confirmRedirectionSubscription = this.redirectWithFiltrationService
    .confirmRedirection$.subscribe((bool) => {
      if(bool)
        return;
      else 
        this.getFilteredProducts(this.catalogService.page);
    })
    
    this.filtrationSubsctiption = this.sidebarService.filtration$
      .pipe(
        map((el: IGetProducts) => {
          // spinner
          this.emptyProducts = false;
          this.sidebarService.products = [];
          this.spinnerService.fillSpinner();
          return el;
        }),
        delay(1000)
      )
      .subscribe(({ products, productsLength }: IGetProducts) => {
        this.sidebarService.products = products;
        this.sidebarService.productsLength = productsLength;
        if (products.length == 0) this.emptyProducts = true;
        else this.emptyProducts = false;
        this.spinnerService.spinnerValue = 0;
        this.spinnerService.spinnerSubscription.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.spinnerService.spinnerValue = 0;
    this.filtrationSubsctiption.unsubscribe();
    this.sidebarService.checkboxArr = [];
    this.sidebarService.products = [];
    this.redirectWithFiltrationService.redirectWithFiltrationSubscription.unsubscribe();
    this.redirectWithFiltrationService.confirmRedirectionSubscription.unsubscribe();
  }

  public cardBigRedirect(
    id: number,
    typeOfProductName: TypeOfProductEnum
  ): void {
    this.cardService.cardInfoRedirect(id, typeOfProductName);
  }

  public changePage(page: number) {
    this.catalogService.page = page;
    this.sidebarService.doFiltration(this.catalogService.page, this.catalogService.itemsPerPage);
  }

  public getFilteredProducts(page: number) {
    this.catalogService.page = page;
    this.sidebarService.doFiltration(this.catalogService.page, this.catalogService.itemsPerPage);
  }


}
