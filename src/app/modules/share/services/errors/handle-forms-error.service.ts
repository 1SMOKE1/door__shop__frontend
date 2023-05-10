import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { SnackbarConfigService } from '../common/snackbar-config.service';

@Injectable({
  providedIn: 'root'
})
export class HandleFormsErrorService {

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly snackbarConfigService: SnackbarConfigService
  ) { }

  public handleErrorFormsMain(error: HttpErrorResponse){
    switch(true){
      case (error.status >= 400 && error.status < 500 
        && error.error.message[0] === "phone must be a phone number"):
        return throwError(() => new Error(`Невірний номер`))
      case error.status >= 500:
        return throwError(() => new Error(`Помилка серверу`))
      default:
        return throwError(() => new Error(`Невідома помилка`))
    } 
  }

  public handleErrorFormLogin(error: HttpErrorResponse){
    return this.handleErrorMarkup(error, 'Некорректні данні');
  }

  public snackbarShowError(err: Error){
    this.snackbar.open(err.message, 'X', this.snackbarConfigService.getSnackBarConfig());
  }

  private handleErrorMarkup(error: HttpErrorResponse, message: string){
    switch(true){
      case (error.status >= 400 && error.status <= 500):
        return throwError(() => new Error(message))
      case error.status >= 500:
        return throwError(() => new Error(`Помилка серверу`))
      default:
        return throwError(() => new Error(`Невідома помилка`))
    }
  }
}
