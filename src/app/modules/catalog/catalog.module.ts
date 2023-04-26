import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CatalogRouterOutletComponent } from './components/catalog-router-outlet/catalog-router-outlet.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShareModule } from '../share/share.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogRouterOutletComponent,
    CardInfoComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    ShareModule,
    MatExpansionModule,
  ]
})
export class CatalogModule { }
