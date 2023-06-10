import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@modules/share/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/store/store.module').then((m) => m.StoreModule)},
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)},
//   {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
