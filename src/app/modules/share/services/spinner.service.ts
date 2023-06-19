import { Injectable } from '@angular/core';
import { Subscription, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerValue: number = 0;
  spinnerSubscription: Subscription;

  fillSpinner(): void{
    this.spinnerValue = 0;
    this.spinnerSubscription = interval(10).subscribe(
      (value: number) => {
          this.spinnerValue += value;
      }
    )
  }
  
}
