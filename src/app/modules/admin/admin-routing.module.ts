import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRouterOutletComponent } from './components/admin-router-outlet/admin-router-outlet.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products/products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminOurWorksComponent } from './components/admin-our-works/admin-our-works.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRouterOutletComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
      {path: 'sign-in', component: SignInComponent},
      {path: 'main-panel', component: MainComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'products'},
        {path: 'products', component: ProductsComponent},
        {path: 'orders', component: AdminOrdersComponent},
        {path: 'carousels', component: AdminOurWorksComponent}
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
