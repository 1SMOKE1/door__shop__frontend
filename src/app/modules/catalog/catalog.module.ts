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
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DescriptionComponent } from './components/description/description.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../admin/interceptors/auth.interceptor';
@NgModule({
  declarations: [
    CatalogComponent,
    CatalogRouterOutletComponent,
    CardInfoComponent,
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    ShareModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class CatalogModule { }
