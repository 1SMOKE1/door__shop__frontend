import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HowOrderComponent } from './components/how-order/how-order.component';

const routes: Routes = [
  {path: 'store', component: MainComponent },
  {path: 'how-order', component: HowOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
