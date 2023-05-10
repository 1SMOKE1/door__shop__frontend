import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarConfigService {

  public getSnackBarConfig(): MatSnackBarConfig{
    return {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 10000,
    }
  }
}
