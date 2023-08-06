import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { IProductProducer } from '../../interfaces/common/product-producer.interface';
import { Options, LabelType, ChangeContext } from '@angular-slider/ngx-slider';
import { SidebarService } from '@share-services/sidebar.service';
import { HttpProductProducerService } from '@share-services/http-product-producer.service';
import { Subscription, debounceTime, delay, distinctUntilChanged } from 'rxjs';
import { RedirectWithFiltrationService } from '@modules/share/services/redirect-with-filtration.service';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { ICheckBoxBlock } from '@modules/share/interfaces/common/checkbox-block.interface';


@Component({
  selector: 'dsf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  typeOfProductEnum = TypeOfProductEnum;


  model: string = '';

  noProductProducers: boolean = false;

  modelChangedSubscription: Subscription;
  redirectWithFiltrationSubscription: Subscription;

  value: number = 0;
  highValue: number = 20000;
  options: Options = {
    floor: 0,
    ceil: 20000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'Від ' + value + ' грн';
        case LabelType.High:
          return 'До ' + value + ' грн';
        default:
          return 'грн' + value;
      }
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      if (minValue === 'Any' && maxValue === 'Any') return minValue;
      if (minValue === '5+' && maxValue === '5+') return maxValue;
      if (minValue === maxValue) return minValue;
      else return minValue + ' - ' + maxValue;
    },
  };
  checkBoxArr: IProductProducer[] = [];

  constructor(
    public readonly sidebarService: SidebarService,
    private readonly httpProductProducerService: HttpProductProducerService,
    private readonly redirectWithFiltrationService: RedirectWithFiltrationService,
  ) {}

  ngOnInit(): void {


    


    this.getProductProducers();

    
    this.modelChangedSubscription =  this.sidebarService.modelChanged$
    .pipe(
      debounceTime(500), // wait 300ms after the last event before emitting last event
      distinctUntilChanged() // only emit if value is different from previous value
    )
    .subscribe((model: string) => this.sidebarService.setSearchValue(model));

    

    this.redirectWithFiltrationService.redirectWithFiltrationSubscription = 
    this.redirectWithFiltrationService
    .redirectWithFiltration$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((typeOfProduct: TypeOfProductEnum) => {
        switch(true){
          case this.typeOfProductEnum.interiorDoor === typeOfProduct:
            this.sidebarService.isExpandedInteriorDoor.next(true);
            this.setAll(true, this.sidebarService.producerBlocks.interiorDoorProducersBlock);
            this.redirectWithFiltrationService.redirectWithFiltrationSubscription.unsubscribe();
            break;
          case this.typeOfProductEnum.entranceDoor === typeOfProduct:
            this.sidebarService.isExpandedEntranceDoor.next(true);
            this.setAll(true, this.sidebarService.producerBlocks.entranceDoorProducersBlock);
            this.redirectWithFiltrationService.redirectWithFiltrationSubscription.unsubscribe();
            break;
          case this.typeOfProductEnum.furniture === typeOfProduct:
            this.sidebarService.isExpandedFurniture.next(true);
            this.setAll(true, this.sidebarService.producerBlocks.furnitureProducersBlock);
            this.redirectWithFiltrationService.redirectWithFiltrationSubscription.unsubscribe();
            break;
          case this.typeOfProductEnum.windows === typeOfProduct:
            this.sidebarService.isExpandedWindow.next(true);
            this.setAll(true, this.sidebarService.producerBlocks.windowsProducersBlock);
            this.redirectWithFiltrationService.redirectWithFiltrationSubscription.unsubscribe();
            break;
        }
        
      })
      
  }

  ngOnDestroy(): void {
    this.modelChangedSubscription.unsubscribe();
    this.sidebarService.isExpandedInteriorDoor.next(false);
    this.sidebarService.isExpandedEntranceDoor.next(false);
    this.sidebarService.isExpandedFurniture.next(false);
    this.sidebarService.isExpandedWindow.next(false);
    this.redirectWithFiltrationService.confirmRedirectionSubject.next(false);
  }

  public setAll(completed: boolean, checkboxBlock: ICheckBoxBlock){
    this.setAllCompleted(completed, checkboxBlock)
    checkboxBlock.subProductProducers.map(({completed, ...item}) => item);
    this.sidebarService.fillConditionArrByAll(this.sidebarService.producerBlocks);
  }

  public someComplete(checkboxBlock: ICheckBoxBlock | undefined): boolean{
    if(checkboxBlock)
     return this.someCheckboxCompleted(checkboxBlock);
    else 
      return false
  }

  public updateAllComplete(checkboxBlock: ICheckBoxBlock): void{
    switch(true){
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.interiorDoor:
        this.sidebarService.producerBlocks.interiorDoorProducersBlock.completed = this.someCheckboxCompleted(checkboxBlock);
        break;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.entranceDoor:
        this.sidebarService.producerBlocks.entranceDoorProducersBlock.completed = this.someCheckboxCompleted(checkboxBlock);
        break;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.furniture:
        this.sidebarService.producerBlocks.furnitureProducersBlock.completed = this.someCheckboxCompleted(checkboxBlock);
        break;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.windows:
        this.sidebarService.producerBlocks.windowsProducersBlock.completed = this.someCheckboxCompleted(checkboxBlock);
        break;
    }
    this.sidebarService.producerBlocksSubject.next(this.sidebarService.producerBlocks);
    checkboxBlock.subProductProducers.filter((el) => el.completed).map(({completed, ...item}) => item);
    this.sidebarService.fillConditionArrByAll(this.sidebarService.producerBlocks);
  }

  public modelChanged(){
    this.sidebarService.modelChanged.next(this.model);
  }

  public getEvent(e: ChangeContext): void {
    this.sidebarService.setSliderMinValue(e.value);
    if (e.highValue) {
      this.sidebarService.setSliderMaxValue(e.highValue);
    }
    this.sidebarService.doFiltration();
  }

  public setNoProductProducersValue(value: boolean): void{
    this.sidebarService.setNoProductProducersValue(value);
  }

  private getProductProducers(): void {
    this.httpProductProducerService
      .getProductProducers()
      .subscribe((producers: IProductProducer[]) => {

        this.sidebarService.producerBlocks
          .interiorDoorProducersBlock
            .subProductProducers = this.filterProducers(producers, this.typeOfProductEnum.interiorDoor);
        
        this.sidebarService.producerBlocks
          .entranceDoorProducersBlock
            .subProductProducers = this.filterProducers(producers, this.typeOfProductEnum.entranceDoor);

        this.sidebarService.producerBlocks
          .furnitureProducersBlock
            .subProductProducers = this.filterProducers(producers, this.typeOfProductEnum.furniture);
        
        this.sidebarService.producerBlocks
          .windowsProducersBlock
            .subProductProducers = this.filterProducers(producers, this.typeOfProductEnum.windows);
      })
  }

  private someCheckboxCompleted(checkboxBlock: ICheckBoxBlock): boolean{
    if (checkboxBlock.subProductProducers == null ) {
      return false;
    }

    switch(true){
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.interiorDoor:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, interiorDoorProducersBlock: {
          ...this.sidebarService.producerBlocks.interiorDoorProducersBlock, 
          completed: this.sidebarService.producerBlocks.interiorDoorProducersBlock.subProductProducers.every(t => t.completed)
        }};
        return this.sidebarService.producerBlocks.interiorDoorProducersBlock.subProductProducers.some(t => t.completed) 
        && this.sidebarService.producerBlocks.interiorDoorProducersBlock.completed === false;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.entranceDoor:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, entranceDoorProducersBlock: {
          ...this.sidebarService.producerBlocks.entranceDoorProducersBlock, 
          completed: this.sidebarService.producerBlocks.entranceDoorProducersBlock.subProductProducers.every(t => t.completed),
        }};
        return this.sidebarService.producerBlocks.entranceDoorProducersBlock.subProductProducers.some((t) => t.completed)
        && this.sidebarService.producerBlocks.entranceDoorProducersBlock.completed === false;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.furniture:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, furnitureProducersBlock: {
          ...this.sidebarService.producerBlocks.furnitureProducersBlock, 
          completed: this.sidebarService.producerBlocks.furnitureProducersBlock.subProductProducers.every(t => (t.completed)),
        }};
        return this.sidebarService.producerBlocks.furnitureProducersBlock.subProductProducers.some((t) => t.completed)
        && this.sidebarService.producerBlocks.furnitureProducersBlock.completed === false;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.windows:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, windowsProducersBlock: {
          ...this.sidebarService.producerBlocks.windowsProducersBlock, 
          completed: this.sidebarService.producerBlocks.windowsProducersBlock.subProductProducers.every(t => t.completed),
        }};
        return this.sidebarService.producerBlocks.windowsProducersBlock.subProductProducers.some((t) => t.completed)
        && this.sidebarService.producerBlocks.windowsProducersBlock.completed === false;
      default:
        return false;
    }
  }

  private setAllCompleted(completed: boolean, checkboxBlock: ICheckBoxBlock): void{
    if (checkboxBlock.subProductProducers == null) {
      return;
    }
    
    switch(true){
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.interiorDoor:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, interiorDoorProducersBlock: {
          ...this.sidebarService.producerBlocks.interiorDoorProducersBlock, subProductProducers: 
          this.sidebarService.producerBlocks.interiorDoorProducersBlock.subProductProducers.map(t => ({...t, completed})),
          completed
        }}
        break;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.entranceDoor:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, entranceDoorProducersBlock: {
          ...this.sidebarService.producerBlocks.entranceDoorProducersBlock, subProductProducers: 
          this.sidebarService.producerBlocks.entranceDoorProducersBlock.subProductProducers.map(t => ({...t, completed})),
          completed
        }}
        break;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.furniture:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, furnitureProducersBlock: {
          ...this.sidebarService.producerBlocks.furnitureProducersBlock, subProductProducers: 
          this.sidebarService.producerBlocks.furnitureProducersBlock.subProductProducers.map(t => ({...t, completed})),
          completed
        }}
        break;
      case checkboxBlock.typeOfProduct === this.typeOfProductEnum.windows:
        this.sidebarService.producerBlocks = {...this.sidebarService.producerBlocks, windowsProducersBlock: {
          ...this.sidebarService.producerBlocks.windowsProducersBlock, subProductProducers: 
          this.sidebarService.producerBlocks.windowsProducersBlock.subProductProducers.map(t => ({...t, completed})),
          completed
        }}
        break;
      }
      this.sidebarService.producerBlocksSubject.next(this.sidebarService.producerBlocks);
  }

  private filterProducers(producers: IProductProducer[], condition: TypeOfProductEnum): IProductProducer[] {
    return producers.filter((el) => el.typeOfProduct.name === condition)
  }



}