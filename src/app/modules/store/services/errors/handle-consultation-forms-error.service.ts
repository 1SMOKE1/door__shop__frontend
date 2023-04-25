import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleConsultationFormsErrorService {

  constructor() { }

  public handleErrorConsultationForms(error: HttpErrorResponse){
    switch(true){
      case (error.status >= 400 && error.status <= 500 
        && error.error.message[0] === "phone must be a phone number"):
        return throwError(() => new Error(`Невірний номер`))
      case error.status >= 500:
        return throwError(() => new Error(`Помилка серверу`))
      default:
        return throwError(() => new Error(`Невідома помилка`))
    }
    
  }
}
