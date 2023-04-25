import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dsf-show-certificate',
  templateUrl: './show-certificate.component.html',
  styleUrls: ['./show-certificate.component.scss']
})
export class ShowCertificateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ShowCertificateComponent>
  ) {}

  public close(): void {
    this.dialogRef.close();
  }
}
