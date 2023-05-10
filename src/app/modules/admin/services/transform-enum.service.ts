import { Injectable } from '@angular/core';
import { ITransformedEnum } from '../interfaces/transformed.enum.interface';


type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
}

@Injectable({
  providedIn: 'root'
})

export class TransformEnumService {

  generateEnumArr<T extends StandardEnum<unknown>>(obj: T): ITransformedEnum[]{
    return Object.values(obj).map((el: string | unknown, index) => ({id: ++index, name: el}));
  }
}
