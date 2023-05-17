import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  public convertArr(formData: FormData, product: any, field: string) {
    if (product[`${field}`] && product[`${field}`].length !== 0)
      return product[`${field}`].forEach((item: string) =>
        formData.append(`${field}[]`, item)
      );
    else 
    return formData.append(`${field}[]`, [].toString());
  }
}
