import { Injectable } from '@angular/core';
import { SnackbarConfigService } from '@modules/share/services/snackbar-config.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  initProductProducersSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  initProductProducers$: Observable<boolean> = this.initProductProducersSubject.asObservable();
  initProductProducersSubscription: Subscription;

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService
  ){}
  
  public convertArr(formData: FormData, product: any, field: string) {
    if (product[`${field}`] && product[`${field}`].length !== 0)
      return product[`${field}`].forEach((item: string) =>
        formData.append(`${field}[]`, item)
      );
    else 
    return formData.append(`${field}[]`, [].toString());
  }

  public checkImagesOnCorrectName(arr: File[]): boolean{
    const valid = !arr.every((file) => !file.name.includes('-'))

    if(valid)
      this.snackbarConfigService.openSnackBar('arr of images has not valid names, pls remove "-" from their names');
    return valid
  }
}
