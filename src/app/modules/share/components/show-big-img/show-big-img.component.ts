import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dsf-show-big-img',
  templateUrl: './show-big-img.component.html',
  styleUrls: ['./show-big-img.component.scss']
})
export class ShowBigImgComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ShowBigImgComponent>
  ) {}

  public close(): void {
    this.dialogRef.close();
  }
}
