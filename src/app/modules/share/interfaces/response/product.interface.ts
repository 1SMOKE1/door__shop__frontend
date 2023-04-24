import { CountryEnum } from "../../enums/country.enum";
import { GuaranteeEnum } from "../../enums/guarantee.enum";
import { InStockEnum } from "../../enums/in-stock.enum";
import { StateEnum } from "../../enums/state.enum";
import { IProductProducerResponse } from "./product-producer.interface";
import { ITypeOfProductResponse } from "./type-of-product.interface";

export interface IProductResponse{
  id: number;
  type_of_product: ITypeOfProductResponse; // Тип продкута
  product_producer: IProductProducerResponse; // Производитель
  name: string, // Назва
  country: CountryEnum, // Країна виробник
  guarantee: GuaranteeEnum, // Гарантійний термін
  state: StateEnum, // Стан
  price: number, // Ціна
  installation_price: number, // Ціна з установкою
  in_stock: InStockEnum, // На складі
  description?: string, // Опис
  amount_of_sealing_materials?: string[] | null, // Кількість ущільнюючих контурів
  fabric_material?: string[] | null, // Матеріл дверного полотна
  purpose?: string[] | null, // Призначення двері
  covering?: string[] | null, // Покриття
  frame_material?: string[] | null, // Матеріал дверної коробки
  profile?: string[] | null, // Профіль 
  construction?:  string[] | null, // Конструкція
  glass_unit?: string[] | null, // Стеклопакети
  lamination?: string [] | null, // Ламінація
  glasses?: string[] | null, // Стекла
  finishing_the_surface?:  string[] | null, // Оздоблення поверхні
  structural_features?:  string[] | null, // Конструктивні особливості
  opening_type?:  string[] | null, // Тип відкривання
  installation_type?: string[] | null, // Тип монтажу
  opening_method?: string[] | null, // Спосіб відкривання
  home_page?: boolean,
  images?: string[],
}