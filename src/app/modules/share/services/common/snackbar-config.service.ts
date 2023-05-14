import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ICalculatorChar } from 'src/app/modules/admin/interfaces/calculator-char.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackbarConfigService {
  updateOneDoorCoveringItem(obj: ICalculatorChar) {
    throw new Error('Method not implemented.');
  }

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
}
