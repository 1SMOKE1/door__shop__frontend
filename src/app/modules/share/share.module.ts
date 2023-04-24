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
import { FooterComponent } from './components/footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { OwlCarouselComponent } from './components/owl-carousel/owl-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';


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
    OwlCarouselComponent,
    SidebarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    LayoutModule,
    CarouselModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    HttpClientModule
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
    OwlCarouselComponent,
    SidebarComponent,
  ]
})
export class ShareModule { }