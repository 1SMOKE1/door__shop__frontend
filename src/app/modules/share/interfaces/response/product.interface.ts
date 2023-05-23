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
  frame_material_thickness?: number, // Товщина короба
  door_insulation?: ICalculatorChar[] // Утеплення
  covering?: ICalculatorChar[], // Оздоблення
  door_peephole?: boolean, // Глазок
  opening_type?: ICalculatorChar[], // Тип відкривання
  size?: ICalculatorChar[], // Розмір
  lower_lock?: IFurniture[], // Нижній замок
  upper_lock?: IFurniture[], // Верхній замок
  weight?: ICalculatorChar[], // Вага
  metal_thickness?: number, // Товщина металу
  frame_material_construction?: ICalculatorChar[]; // Конструкція короба
  sealer_circuit?: ICalculatorChar[]; // Контур Ущільнення
  // вікна
  mosquito_net?: ICalculatorChar[], // Москітна сітка
  window_sill?: ICalculatorChar[], // Підвіконня
  window_ebb?: ICalculatorChar[], // Віконний відлив
  window_hand?: ICalculatorChar[], // Віконна ручка
  child_lock?: ICalculatorChar[], // Дитячий замок
  housewife_stub?: ICalculatorChar[], // Заглушка домогосподарки
  glass_pocket_add?: ICalculatorChar[], // Додаткові стеклопакети
  window_lamination?: ICalculatorChar[], // Ламінація
  window_profile?: ICalculatorChar[], // Профіль
  window_width?: number, // Ширина вікна
  window_height?: number, // Висота вікна
  cameras_count?: ICalculatorChar[], // Кількість камер
  features?: ICalculatorChar[], // Особливості
  sections_count?: ICalculatorChar[], // Кількість секцій
  description?: string, // Опис
  home_page?: boolean,
  images?: string[],
}