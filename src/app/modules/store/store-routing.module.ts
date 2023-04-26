import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HowOrderComponent } from './components/how-order/how-order.component';
import { GuaranteeComponent } from './components/guarantee/guarantee.component';
import { DoorZamirComponent } from './components/door-zamir/door-zamir.component';
import { DoorInstallationComponent } from './components/door-installation/door-installation.component';
import { DesignersBuildersComponent } from './components/designers-builders/designers-builders.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ChooseDoorComponent } from './components/choose-door/choose-door.component';
import { CertificatesComponent } from './components/certificates/certificates/certificates.component';
import { StoreRoutingOutletComponent } from './components/store-routing-outlet/store-routing-outlet.component';
import { PageNotFoundComponent } from '../share/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'store'},
  {
    path: 'store',
    component: StoreRoutingOutletComponent, 
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'main'},
      {path: 'main', component: MainComponent},
      {path: 'how-order', component: HowOrderComponent},
      {path: 'guarantee', component: GuaranteeComponent},
      {path: 'door-zamir', component: DoorZamirComponent},
      {path: 'door-installation', component: DoorInstallationComponent},
      {path: 'designers-builders', component: DesignersBuildersComponent},
      {path: 'comments', component: CommentsComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'choose-door', component: ChooseDoorComponent},
      {path: 'certificates', component: CertificatesComponent},
      {path: 'catalog', loadChildren: () => import('../catalog/catalog.module').then((m) => m.CatalogModule)},
      {path: 'page-not-found', component: PageNotFoundComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'page-not-found'}
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
