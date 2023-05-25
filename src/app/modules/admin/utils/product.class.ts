import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";
import { IProductProducer } from "../../share/interfaces/common/product-producer.interface";

export class ProductClass{

  protected noProductProducer: IProductProducer = {
    id: 0,
    name: 'Без виробника',
    typeOfProduct: {
      id: 0,
      name: TypeOfProductEnum.noProductProducer,
    }
  };
}