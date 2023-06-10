import { TypeOfProductEnum } from "../../share/enums/type-of-product.enum";
import { IProductProducer } from "../../share/interfaces/common/product-producer.interface";

export class ProductClass{

  headersForFormData = {
    headers: {
      'Content-Type': 'multipart/form-data;'
    }
  }

  protected noProductProducer: IProductProducer = {
    id: 0,
    name: 'Без виробника',
    typeOfProduct: {
      id: 0,
      name: TypeOfProductEnum.noProductProducer,
    }
  };
}