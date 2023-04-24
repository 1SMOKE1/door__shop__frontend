import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowCertificateComponent } from '../show-certificate/show-certificate.component';

@Component({
  selector: 'dsf-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {

  constructor(
    private readonly dialog: MatDialog
  ){}



  public showImg(e: Event): void{
    let cur = e.target as HTMLImageElement;
    let img = cur.src;
    let dialogRef = this.dialog.open(ShowCertificateComponent, {
      data: img
    })
    dialogRef.updateSize('600px');
  }
}
