import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IProductProducer } from '@share-interfaces/common/product-producer.interface';
import { FiltrationService } from './filtration.service';
import { IHoleFiltration } from '@share-interfaces/common/hole-filtration.interface';
import { IGetProducts } from '@share-interfaces/common/get-products.interface';
import { SnackbarConfigService } from './snackbar-config.service';
import { IProducerBlocks } from '../interfaces/common/producer-blocks.interface';
import { ICheckBoxBlock } from '../interfaces/common/checkbox-block.interface';
import { SpinnerService } from './spinner.service';
import { TypeOfProductEnum } from '../enums/type-of-product.enum';
import { IProduct } from '../interfaces/common/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  products: IProduct[] = [];
  productsCopy: IProduct[] = [];
  productsLength: number = 0;
  productsCopyLength: number = 0;

  typeOfProductEnum = TypeOfProductEnum;

  modelChanged: Subject<string> = new Subject<string>();
  modelChanged$: Observable<string> = this.modelChanged.asObservable();

  filtration: Subject<IGetProducts> = new Subject();
  filtration$: Observable<IGetProducts> = this.filtration.asObservable();

  isExpandedInteriorDoor: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isExpandedInteriorDoor$: Observable<boolean> = this.isExpandedInteriorDoor.asObservable();

  isExpandedEntranceDoor: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isExpandedEntranceDoor$: Observable<boolean> = this.isExpandedEntranceDoor.asObservable();

  isExpandedFurniture: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isExpandedFurniture$: Observable<boolean> = this.isExpandedFurniture.asObservable();

  isExpandedWindow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isExpandedWindow$: Observable<boolean> = this.isExpandedWindow.asObservable();

  producerBlocks: IProducerBlocks = {
    interiorDoorProducersBlock: this.initProducersBlock(this.typeOfProductEnum.interiorDoor),
    entranceDoorProducersBlock: this.initProducersBlock(this.typeOfProductEnum.entranceDoor),
    furnitureProducersBlock: this.initProducersBlock(this.typeOfProductEnum.furniture),
    windowsProducersBlock: this.initProducersBlock(this.typeOfProductEnum.windows),
  }

  producerBlocksSubject: BehaviorSubject<IProducerBlocks> = new BehaviorSubject(this.producerBlocks);
  producerBlocks$: Observable<IProducerBlocks> = this.producerBlocksSubject.asObservable();

  checkboxArr: IProductProducer[] = [];
  checkboxMainArr: IProductProducer[] = [];
  sliderMinValue: number = 0;
  sliderMaxValue: number = 20000;
  searchValue: string = '';

  noProductProducersValue: boolean = false;

  constructor(
    private readonly filtrationService: FiltrationService,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly spinnerService: SpinnerService
  ) {}

  private fillConditionArr(arr: IProductProducer[], condition: IProductProducer): void {
    !arr.includes(condition)
      ? arr.push(condition)
      : arr.filter((el) => el.id !== condition.id)
  }

  fillConditionArrByAll(producerBlocks: IProducerBlocks): void{
    this.checkboxArr = [];
    const producerArrBlocks = Object.values(producerBlocks);

    producerArrBlocks.map((obj: ICheckBoxBlock) => {
      const producerSubProductProducers = Object.values(obj)[Object.values(obj).length - 1];
      producerSubProductProducers.forEach((producer: IProductProducer) => {
        if(producer.completed)
        this.fillConditionArr(this.checkboxArr, producer);
      })
    })

    this.doFiltration();
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


    // if((this.searchValue === "" 
    // && this.checkboxArr.length === 0 
    // && (this.sliderMinValue === 0 && this.sliderMaxValue === 20000) 
    // && this.noProductProducersValue === false) && this.products.length !== 0){
    //   console.log('here')
    //   this.spinnerService.spinnerValue = 0;
    //   this.filtration.next({products: this.productsCopy, productsLength: this.productsCopyLength});
    // } else {
    //   if ((this.searchValue === "" 
    //   && this.checkboxArr.length === 0 
    //   && (this.sliderMinValue === 0 && this.sliderMaxValue === 20000) 
    //   && this.noProductProducersValue === false) && this.products.length === 0){
    //     this.filtrationService.allProductsWithPagination(
    //       page ? page : 1,
    //       itemsPerPage ? itemsPerPage : 8
    //     )
    //     .then((data: IGetProducts) => {
    //       this.spinnerService.spinnerValue = 0;
    //       this.filtration.next(data);
    //       this.productsCopy = data.products;
    //       this.productsCopyLength = data.productsLength;
    //     })
    //     .catch( (err: Error) => this.snackbarConfigService.showErrorPromise(err))
    //   } else {
    //     this.holeFiltrationWithPagination(
    //       page ? page : 1,
    //       itemsPerPage ? itemsPerPage : 8
    //       )
    //       .then((data: IGetProducts) => {
    //         this.spinnerService.spinnerValue = 0;
    //         this.filtration.next(data);
    //       })
    //       .catch( (err: Error) => this.snackbarConfigService.showErrorPromise(err))
    //   }
    // }
    this.holeFiltrationWithPagination(
      page ? page : 1,
      itemsPerPage ? itemsPerPage : 8
      )
      .then((data: IGetProducts) => {
        this.spinnerService.spinnerValue = 0;
        this.filtration.next(data);
      })
      .catch( (err: Error) => this.snackbarConfigService.showErrorPromise(err))
    
    
  }

  public holeFiltrationWithPagination(
    page: number,
    itemsPerPage: number
  ): Promise<IGetProducts> { 
    const data: IHoleFiltration = {
      checkboxArr: this.checkboxArr,
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

  private initProducersBlock(typeOfProduct: TypeOfProductEnum): ICheckBoxBlock{
    return {
      name: 'Обрати усі',
      completed: false,
      typeOfProduct,
      subProductProducers: []
    }
  }

}
