import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IProductProducer } from '../../interfaces/common/product-producer.interface';
import { FiltrationService } from './filtration.service';
import { IHoleFiltration } from '../../interfaces/common/hole-filtration.interface';
import { IGetProducts } from '../../interfaces/common/get-products.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarConfigService } from './snackbar-config.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  modelChanged: Subject<string> = new Subject<string>();
  modelChanged$: Observable<string> = this.modelChanged.asObservable();

  filtration: Subject<IGetProducts> = new Subject();
  filtration$: Observable<IGetProducts> = this.filtration.asObservable();

  checkBoxArr: IProductProducer[] = [];
  sliderMinValue: number = 0;
  sliderMaxValue: number = 20000;
  searchValue: string = '';

  noProductProducersValue: boolean = false;

  constructor(
    private readonly filtrationService: FiltrationService,
    private readonly snackbarConfigService: SnackbarConfigService
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
    this.doFiltration();
  }

  setNoProductProducersValue(value: boolean): void{
    this.noProductProducersValue = value;
    this.doFiltration();
  }


  public doFiltration(page?: number, itemsPerPage?: number): void {
    this.holeFiltrationWithPagination(
      page ? page : 1,
      itemsPerPage ? itemsPerPage : 8
    )
    .subscribe({next: (data) => {
      this.filtration.next(data);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err)
      this.snackbarConfigService.showError(err)
    }
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
      noProductProducers: this.noProductProducersValue
    };

    return this.filtrationService.holeFiltrationWithPagination(
      data,
      page,
      itemsPerPage
    );
  }
}
