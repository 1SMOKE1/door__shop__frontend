import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarComponent } from 'src/app/modules/share/components/sidebar/sidebar.component';
import { IGetProducts } from 'src/app/modules/share/interfaces/common/get-products.interface';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { HttpProductService } from 'src/app/modules/share/services/http-product.service';
import { CardService } from '../../services/card.service';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';

@Component({
  selector: 'dsf-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit{
  filtrationSubsctiption!: Subscription;

  @ViewChildren(SidebarComponent) routerLinks?: QueryList<any>;

  selectedId: number = 0;
  page: number = 1; // currentPage
  itemsPerPage: number = 8;
  productsLength: number = 0;
  isFiltered: boolean = false;
  products: IProduct[] = [];
  search: string = '';

  constructor(
    private readonly httpProductService: HttpProductService,
    private readonly cardService: CardService
  ){

  }

  ngOnInit(): void {
    this.httpProductService.getProducts()
    .subscribe(({products, productsLength}: IGetProducts) => {
      this.products = products;
      this.productsLength = productsLength;
    })
  }

  public cardBigRedirect(id: number, typeOfProductName: TypeOfProductEnum): void{
    this.cardService.cardInfoRedirect(id, typeOfProductName);
  }

  public changePage(page: number) {
    this.page = page;
    this.isFiltered = true;
    // if(!this.isFiltered){
    //   this.dataBaseService
    //   .getProductsWithQuery(this.page, this.itemsPerPage)
    //   .pipe(
    //     map((data) => {
    //       this.prods = []
    //       return data;
    //     })
    //   )
    //     .subscribe((({products, productsLength}: IGetProductsResponse) => {
    //       this.prods = products;
    //       this.prodsLength = productsLength;
    //     }))
    // } else {
    //   this.getFilteredProducts(page)
    // }
  }
}
