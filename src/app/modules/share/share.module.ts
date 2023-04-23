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
import { LineComponent } from './components/line/line.component';
import { OurManufacturersComponent } from './components/our-manufacturers/our-manufacturers.component';
import { FooterComponent } from './components/footer/footer.component';import { LayoutModule } from '@angular/cdk/layout';
;


@NgModule({
  declarations: [
    HeaderComponent,
    OrderBasketComponent,
    NavComponent,
    NavDialogComponent,
    NavLogoComponent,
    LineComponent,
    OurManufacturersComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    LayoutModule
  ],
  exports: [
    HeaderComponent,
    OrderBasketComponent,
    NavComponent,
    NavDialogComponent,
    NavLogoComponent,
    LineComponent,
    OurManufacturersComponent,
    FooterComponent,
  ]
})
export class ShareModule { }
