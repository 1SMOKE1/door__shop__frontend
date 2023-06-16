import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavService } from '@share-services/nav.service';
import { ScrollConditionEnum } from '../../../enums/scroll-condition.enum';

@Component({
  selector: 'dsf-nav-dialog',
  templateUrl: './nav-dialog.component.html',
  styleUrls: ['./nav-dialog.component.scss']
})
export class NavDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<NavDialogComponent>,
    private navService: NavService,
  ) {}


  public closeDialog(): void{
    this.dialogRef.close()
  }

  public closeDialogToConsultationForm(): void{
    this.closeDialog(); 
    this.navService.freeFormStream(`${ScrollConditionEnum.CONSULTATION}`);
  }

  public closeDialogToZamirForm(): void{
    this.closeDialog(); 
    this.navService.freeFormStream(`${ScrollConditionEnum.ZAMIR}`);
  }
}
