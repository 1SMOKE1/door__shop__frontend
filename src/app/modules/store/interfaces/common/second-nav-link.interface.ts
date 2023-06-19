import { TypeOfProductEnum } from "@modules/share/enums/type-of-product.enum";

export interface ISecondNavLink{
  text: string;
  path: string;
  action: TypeOfProductEnum
}