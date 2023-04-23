import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { NavDialogComponent } from '../nav-dialog/nav-dialog.component';


@Component({
  selector: 'dsf-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog
  ){}

  openNavDialog(): void{
    const dialogRef =  this.dialog.open(NavDialogComponent);
    this.breakpointObserver.observe([
      "(max-width: 1000px)"
    ])
    .subscribe(() => dialogRef.close());
    // this.window?.addEventListener('resize', () => {
    //   if(this.window!.innerWidth > 1000){
    //     dialogRef.close()
    //   }
    // })
  }

  public scrollToConsultationForm(): void{

  }

  public scrollToZamirForm(): void{
    
  }
}
