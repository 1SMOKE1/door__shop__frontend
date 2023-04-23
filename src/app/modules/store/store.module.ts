import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from '../share/components/header/header.component';
import { NavLogoComponent } from '../share/components/nav/nav-logo/nav-logo.component';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowOrderComponent } from './components/how-order/how-order.component';



@NgModule({
  declarations: [
    MainComponent,
    HowOrderComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
