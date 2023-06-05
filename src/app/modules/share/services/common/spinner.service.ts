import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerSubscription!: Subscription;

  spinnerValue: number = 0;


  
}
