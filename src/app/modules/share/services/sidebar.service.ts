import { Injectable } from '@angular/core';
import { productMultiType } from '../types/product.type';
import { Subject, Observable } from 'rxjs';
import { IProductProducer } from '../interfaces/common/product-producer.interface';
import { FiltrationService } from './filtration.service';
import { IHoleFiltration } from '../interfaces/common/hole-filtration.interface';
import { HttpProductService } from './http-product.service';
import { IGetProducts } from '../interfaces/common/get-products.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  filteredProds: productMultiType[] = [];

  filtration: Subject<IGetProducts> = new Subject();
  filtration$: Observable<IGetProducts> =
    this.filtration.asObservable();

  products: productMultiType[] = [];
  checkBoxArr: IProductProducer[] = [];
  sliderMinValue: number = 0;
  sliderMaxValue: number = 20000;
  searchValue: string = '';

  constructor(
    private readonly httpProductService: HttpProductService,
    private readonly filtrationService: FiltrationService
  ) {}

  fillConditionArr(condition: IProductProducer): void {
    !this.checkBoxArr.includes(condition)
      ? this.checkBoxArr.push(condition)
      : this.checkBoxArr.splice(this.checkBoxArr.indexOf(condition), 1);
  }

  setSliderMinValue(value: number): void {
    this.sliderMinValue = value;
  }

  setSliderMaxValue(value: number): void {
    this.sliderMaxValue = value;
  }

  setSearchValue(value: string): void {
    this.searchValue = value;
  }

  public getProds(): Observable<IGetProducts> {
    return this.httpProductService.getProducts();
  }

  public doFiltration(page?: number, itemsPerPage?: number): void {
    this.holeFiltrationWithPagination(
      page ? page : 1,
      itemsPerPage ? itemsPerPage : 8
    ).subscribe((data) => {
      this.filtration.next(data);
    });
  }

  public holeFiltrationWithPagination(
    page: number,
    itemsPerPage: number
  ): Observable<IGetProducts> {
    const data: IHoleFiltration = {
      checkboxArr: this.checkBoxArr,
      sliderValue: {
        sliderMinValue: this.sliderMinValue,
        sliderMaxValue: this.sliderMaxValue,
      },
      searchValue: this.searchValue,
    };

    return this.filtrationService.holeFiltrationWithPagination(
      data,
      page,
      itemsPerPage
    );
  }
}
