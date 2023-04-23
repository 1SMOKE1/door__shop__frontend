import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { NavDialogComponent } from '../nav-dialog/nav-dialog.component';
import { Observable, Subscription, map } from 'rxjs';


@Component({
  selector: 'dsf-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy{

  isMobileScreen$: Observable<boolean>;
  isMobileSubscription: Subscription;
  
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.isMobileScreen$ = this.breakpointObserver
    .observe(['(min-width: 1000px)'])
    .pipe(map(({matches}) => matches))
    
    this.isMobileSubscription = this.isMobileScreen$
    .subscribe((bool: boolean) => {
      if(bool)
      this.dialog.closeAll();
    })

  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

  public openNavDialog(): void{
    this.dialog.open(NavDialogComponent);
  }

  public scrollToConsultationForm(): void{

  }

  public scrollToZamirForm(): void{
    
  }



  
}
