import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'dsf-nav-dialog',
  templateUrl: './nav-dialog.component.html',
  styleUrls: ['./nav-dialog.component.scss']
})
export class NavDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<NavDialogComponent>,
    private navService: NavService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  public closeDialog(): void{
    this.dialogRef.close()
  }

  public closeDialogToConsultationForm(): void{
    this.closeDialog();
    // this.dialogRef.afterClosed().subscribe(() => {
    //   this.navService.animationScrollToConsultationMobile();
    // })
  }
}
