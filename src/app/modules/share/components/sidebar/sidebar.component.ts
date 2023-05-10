import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductProducer } from '../../interfaces/common/product-producer.interface';
import { Options, LabelType, ChangeContext } from '@angular-slider/ngx-slider';
import { SidebarService } from '../../services/common/sidebar.service';
import { HttpProductProducerService } from '../../services/common/http-product-producer.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'dsf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  interiorDoorProducers: IProductProducer[] = [];
  entranceDoorProducers: IProductProducer[] = [];
  furnitureProducers: IProductProducer[] = [];
  windowProducers: IProductProducer[] = [];

  model: string = '';

  modelChangedSubscription: Subscription;

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
    private readonly sidebarService: SidebarService,
    private readonly httpProductProducerService: HttpProductProducerService
  ) {}

  ngOnInit(): void {
    this.getProductProducers();
    this.modelChangedSubscription =  this.sidebarService.modelChanged$
    .pipe(
      debounceTime(500), // wait 300ms after the last event before emitting last event
      distinctUntilChanged() // only emit if value is different from previous value
    )
    .subscribe((model: string) => this.sidebarService.setSearchValue(model))
  }

  ngOnDestroy(): void {
    this.modelChangedSubscription.unsubscribe();
  }

  public modelChanged(){
    this.sidebarService.modelChanged.next(this.model);
  }

  public fillConditionArr(condition: IProductProducer) {
    this.sidebarService.fillConditionArr(condition);
    this.sidebarService.doFiltration();
  }

  public getEvent(e: ChangeContext): void {
    this.sidebarService.setSliderMinValue(e.value);
    if (e.highValue) {
      this.sidebarService.setSliderMaxValue(e.highValue);
    }
    this.sidebarService.doFiltration();
  }

  private getProductProducers(): void {
    this.getEntranceDoorProductProducers();
    this.getInteriorDoorProductProducers();
    this.getFurnitureProductProducers();
    this.getWindowProductProducers();
  }

  private getEntranceDoorProductProducers(): void {
    this.httpProductProducerService
      .getEntranceDoorProductProducers()
      .subscribe((producers: IProductProducer[]) => 
        this.entranceDoorProducers = producers
        );
  }

  private getInteriorDoorProductProducers(): void {
    this.httpProductProducerService
      .getInteriorDoorProductProducers()
      .subscribe((producers: IProductProducer[]) =>
          this.interiorDoorProducers = producers
          );
  }

  private getFurnitureProductProducers(): void {
    this.httpProductProducerService
      .getFurnitureProductProducers()
      .subscribe((producers: IProductProducer[]) => 
        this.furnitureProducers = producers
        );
  }

  private getWindowProductProducers(): void {
    this.httpProductProducerService
      .getWindowProductProducers()
      .subscribe((producers: IProductProducer[]) =>
        this.windowProducers = producers
        );
  }
}
