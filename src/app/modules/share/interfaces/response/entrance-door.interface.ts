import { ICalculatorChar } from "src/app/modules/admin/interfaces/calculator-char.interface";
import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { IProductProducer } from "../common/product-producer.interface";
import { ITypeOfProductResponse } from "./type-of-product.interface";
import { IFurniture } from "../common/furniture.interface";

export interface IEntranceDoorResponse{
  id: number;

  name: string;

  product_producer: IProductProducer | null;

  type_of_product: ITypeOfProductResponse;

  country: CountryEnum;

  guarantee: GuaranteeEnum;

  price: number;

  in_stock: InStockEnum;

  fabric_material_thickness: number; // Товщина полотна // для обох дверей

  frame_material_thisckness: number; // Товщина короба

  door_insulation: ICalculatorChar[]; // Утпелення

  covering: ICalculatorChar[]; // Оздоблення

  door_peephole: boolean; // Глазок

  opening_type: ICalculatorChar[]; // Тип відкривання

  size: ICalculatorChar[]; // Розмір

  lower_lock: IFurniture[]; // Нижній замок
  
  upper_lock: IFurniture[]; // Верхній замок

  door_hand: IFurniture[]; // Дверна ручка

  weight: ICalculatorChar[]; // Вага

  metal_thickness: number; // Товщина металу

  frame_material_constuction: ICalculatorChar[]; // Конструкція короба

  sealer_circuit: ICalculatorChar[];

  description: string;

  home_page: boolean;

  images: string[];
}