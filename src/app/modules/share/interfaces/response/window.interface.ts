import { ICalculatorChar } from '@modules/admin/interfaces/calculator-char.interface';
import { CountryEnum } from '../../enums/country.enum';
import { GuaranteeEnum } from '../../enums/guarantee.enum';
import { InStockEnum } from '../../enums/in-stock.enum';
import { IProductProducer } from '../common/product-producer.interface';
import { ITypeOfProductResponse } from './type-of-product.interface';

export interface IWindowResponse {
  id: number;

  name: string;

  product_producer: IProductProducer | null;

  type_of_product: ITypeOfProductResponse;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  in_stock: InStockEnum;

  mosquito_net: ICalculatorChar[]; // Москітна сітка

  window_sill: ICalculatorChar[]; // Підвіконня

  window_ebb: ICalculatorChar[]; // Віконний відлив

  window_hand: ICalculatorChar[]; // Віконна ручка

  child_lock: ICalculatorChar[]; // Дитячий замок

  housewife_stub: ICalculatorChar[]; // Заглушка домогосподарки

  glass_pocket_add: ICalculatorChar[]; // Додаткові стеклопакети

  lamination: ICalculatorChar[]; // Ламінація

  profile: ICalculatorChar[]; // Профіль

  window_width: number; // Ширина вікна

  window_height: number; // Висота вікна

  cameras_count: ICalculatorChar[]; // Кількість камер

  features: ICalculatorChar[]; // Особливості

  sections_count: ICalculatorChar[]; // Кількість секцій

  description: string;

  home_page: boolean;

  images: string[];
}
