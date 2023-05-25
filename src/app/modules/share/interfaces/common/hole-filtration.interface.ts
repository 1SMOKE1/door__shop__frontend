import { IProductProducer } from "./product-producer.interface";
import { ISliderValue } from "./slider-value.interface";

export interface IHoleFiltration{
  checkboxArr: IProductProducer[],
  sliderValue: ISliderValue,
  searchValue: string,
  noProductProducers: boolean
}