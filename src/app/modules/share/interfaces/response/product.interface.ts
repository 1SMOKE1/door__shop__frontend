import { ICalculatorChar } from "src/app/modules/admin/interfaces/calculator-char.interface";
import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { IFurniture } from "../common/furniture.interface";
import { IProductProducerResponse } from "./product-producer.interface";
import { ITypeOfProductResponse } from "./type-of-product.interface";

export interface IProductResponse{
  id: number;
  type_of_product: ITypeOfProductResponse; // Тип продкута
  product_producer: IProductProducerResponse; // Производитель
  name: string, // Назва
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  price: number, // Ціна
  in_stock: InStockEnum, // На складі
  
  fabric_material_thickness?: number, // Товщина полотна // для обох дверей
  fabric_material_height?: number, // Висота полотна
  fabric_material_width?: ICalculatorChar[], // Ширина полотна
  door_isolation?: ICalculatorChar[], // Шумоізоляція
  door_frame_material?: ICalculatorChar[], // Короб
  door_selection_board?: ICalculatorChar[], // Добірна дошка
  door_welt?:  ICalculatorChar[], // Лиштва
  door_hand?: IFurniture[], // Ручка
  door_mechanism?: IFurniture[], // Механізм
  door_loops?: IFurniture[], // Петлі
  door_stopper?:  IFurniture[], // Стопор
  door_sliding_system?: ICalculatorChar[], // Роздвижна система
  // Міжкімнатні
  frame_material_thickness?: string[], // Товщина короба
  door_insulation?: string[] // Утеплення
  door_covering?: string[], // Оздоблення
  door_peephole?: boolean, // Глазок
  opening_type?: string[], // Тип відкривання
  door_size?: string[], // Розмір
  lower_lock?: string[], // Нижній замок
  upper_lock?: string[], // Верхній замок
  door_weight?: string[], // Вага
  metal_thickness?: number, // Товщина металу
  frame_material_construction?: string[]; // Конструкція короба
  sealer_circuit?: string[]; // Контур Ущільнення
  // вікна
  mosquit_net?: string[], // Москітна сітка
  window_sill?: string[], // Підвіконня
  window_ebb?: string[], // Віконний відлив
  window_hand?: string[], // Віконна ручка
  child_lock?: string[], // Дитячий замок
  housewife_stub?: string[], // Заглушка домогосподарки
  glass_pocket_add?: string[], // Додаткові стеклопакети
  window_lamination?: string[], // Ламінація
  window_profile?: string[], // Профіль
  window_width?: number, // Ширина вікна
  window_height?: number, // Висота вікна
  cameras_count?: string[], // Кількість камер
  features?: string[], // Особливості
  sections_count?: string[], // Кількість секцій
  description?: string, // Опис
  home_page?: boolean,
  images?: string[],
}