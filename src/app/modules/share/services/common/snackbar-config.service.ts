import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarConfigService {

  constructor(
    private readonly snackbar: MatSnackBar
  ){}

  public getSnackBarConfig(): MatSnackBarConfig{
    return {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 10000,
    }
  }

  public openSnackBar(message: string): void{
    this.snackbar.open(
      message,
      'X',
      this.getSnackBarConfig()
    );
  }

  public convertingErrorMessage(err: Error): string{ 
    switch(true){ 
      case typeof err.message === 'string':
        return err.message;
      case typeof err.message === 'object':
        const messageArr = err.message as unknown as string[]
        return messageArr.join(',');
      default:
        return 'some Error'
    }
  }

  public showError({error}: HttpErrorResponse): void{
    return this.openSnackBar(this.convertingErrorMessage(error));
  }
}
