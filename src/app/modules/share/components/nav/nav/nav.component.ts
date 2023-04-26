import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavDialogComponent } from '../nav-dialog/nav-dialog.component';
import { Observable, Subscription, map } from 'rxjs';
import { NavService } from '../../../services/nav.service';
import { ScrollConditionEnum } from '../../../enums/scroll-condition.enum';


@Component({
  selector: 'dsf-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy{

  navDialog: MatDialogRef<NavDialogComponent, any>;

  isMobileScreen$: Observable<boolean>;
  isMobileSubscription: Subscription;
  
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly navService: NavService,
    private readonly dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.isMobileScreen$ = this.breakpointObserver
    .observe(['(min-width: 1000px)'])
    .pipe(map(({matches}) => matches))
    
    this.isMobileSubscription = this.isMobileScreen$
    .subscribe((bool: boolean) => {
      if(bool && this.navDialog !== undefined)
      this.navDialog.close();
    })

  }

  ngOnDestroy(): void {
    this.isMobileSubscription.unsubscribe();
  }

  public openNavDialog(): void{
    this.navDialog = this.dialog.open(NavDialogComponent);
  }

  public scrollToConsultationForm(): void{
    this.navService.freeFormSream(`${ScrollConditionEnum.CONSULTATION}`);
  }

  public scrollToZamirForm(): void{
    this.navService.freeFormSream(`${ScrollConditionEnum.ZAMIR}`);
  }



  
}
