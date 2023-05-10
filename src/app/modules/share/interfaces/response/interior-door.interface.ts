import { ICalculatorChar } from 'src/app/modules/admin/interfaces/calculator-char.interface';
import { CountryEnum } from '../../enums/country.enum';
import { GuaranteeEnum } from '../../enums/guarantee.enum';
import { InStockEnum } from '../../enums/in-stock.enum';
import { IFurniture } from '../common/furniture.interface';
import { IProductProducer } from '../common/product-producer.interface';
import { ITypeOfProductResponse } from './type-of-product.interface';

export interface IInteriorDoorResponse {
  id: number;

  name: string;

  product_producer: IProductProducer | null;

  type_of_product: ITypeOfProductResponse;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  in_stock: InStockEnum;

  fabric_material_thickness: number; // Товщина полотна // для обох дверей

  fabric_material_height: number; // Висота полотна

  fabric_material_width: ICalculatorChar[]; // Ширина полотна

  door_isolation: ICalculatorChar[]; // Шумоізоляція

  door_frame_material: ICalculatorChar[]; // Короб

  door_selection_board: ICalculatorChar[]; // Добірна дошка

  door_welt: ICalculatorChar[]; // Лиштва

  door_hand: IFurniture[]; // Ручка

  door_mechanism: IFurniture[]; // Механізм

  door_loops: IFurniture[]; // Петлі

  door_stopper: IFurniture[]; // Стопор

  door_sliding_system: ICalculatorChar[]; // Роздвижна система

  description: string;

  home_page: boolean;

  images: string[];
}
