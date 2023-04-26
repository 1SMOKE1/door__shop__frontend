import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../share/interfaces/common/product.interface';
import { TypeOfProductEnum } from '../../share/enums/type-of-product.enum';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  private selectedId: number = 0;
  product: IProduct | null = null;

  constructor(
    private readonly router: Router,
  ) { }

  public cardInfoRedirect(id: number, typeOfProductName: TypeOfProductEnum){
    this.setSelectedId(id);
    this.router.navigate(['store', 'catalog', 'card', id], {
      state: {id},
      queryParams: { typeOfProduct: typeOfProductName}
    })
  }

  public setSelectedId(id: number): void{
    this.selectedId = id;
  }

  public getSelectedId(): number{
    return this.selectedId;
  }






}
