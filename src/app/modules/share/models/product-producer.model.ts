import { IProductProducer } from "../interfaces/common/product-producer.interface";
import { ITypeOfProductResponse } from "../interfaces/response/type-of-product.interface";


export class ProductProducerModel implements IProductProducer{

  constructor(
    public id: number,
    public name: string,
    public typeOfProduct: ITypeOfProductResponse,
    public completed: boolean
  ){}

}