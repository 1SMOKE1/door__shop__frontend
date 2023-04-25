import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarComponent } from 'src/app/modules/share/components/sidebar/sidebar.component';
import { IGetProducts } from 'src/app/modules/share/interfaces/common/get-products.interface';
import { HttpProductService } from 'src/app/modules/share/services/http-product.service';
import { productMultiType } from 'src/app/modules/share/types/product.type';

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
  products: productMultiType[] = [];
  search: string = '';

  constructor(
    private readonly httpProductService: HttpProductService,
    private readonly router: Router
  ){

  }

  ngOnInit(): void {
    this.httpProductService.getProducts()
    .subscribe(({products, productsLength}: IGetProducts) => {
      this.products = products;
      this.productsLength = productsLength;

    })
  }

  public cardBigRedirect(id: number): void{
    this.selectedId = id;
    this.router.navigate(['/catalog', 'card', id], {
      state: {id}
    })
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
