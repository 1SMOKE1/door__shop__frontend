import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OrderBasketComponent } from './components/order-basket/order-basket.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { NavDialogComponent } from './components/nav/nav-dialog/nav-dialog.component';
import { NavLogoComponent } from './components/nav/nav-logo/nav-logo.component';
import { LineComponent } from './components/line/line.component';;


@NgModule({
  declarations: [
    HeaderComponent,
    OrderBasketComponent,
    NavComponent,
    NavDialogComponent,
    NavLogoComponent,
    LineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ShareModule { }
