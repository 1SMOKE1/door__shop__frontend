import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CardInfoComponent } from './components/card-info/card-info.component';

const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full',
    redirectTo: 'cardList',
  },
  {
    path: 'cardList', component: CatalogComponent
  },
  {
    path: 'card/:id', component: CardInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
