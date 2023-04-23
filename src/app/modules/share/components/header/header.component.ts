import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dsf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
    private readonly dialog: MatDialog
  ){}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  public toBasket(): void{

    // const dialogRef = this.dialog.open()

  }

  
}
