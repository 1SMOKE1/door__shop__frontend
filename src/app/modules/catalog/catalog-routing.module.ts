import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogRouterOutletComponent } from './components/catalog-router-outlet/catalog-router-outlet.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CardInfoComponent } from './components/card-info/card-info.component';

const routes: Routes = [
  {
    path: '', 
    component: CatalogRouterOutletComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'cardlist'
      },
      {
        path: 'cardlist',
        component: CatalogComponent,
      },
      {
        path: 'card/:id',
        component: CardInfoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
