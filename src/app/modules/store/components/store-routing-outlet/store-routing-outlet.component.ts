import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dsf-store-routing-outlet',
  templateUrl: './store-routing-outlet.component.html',
})
export class StoreRoutingOutletComponent {

  constructor(
    public readonly router: Router,
  ){}

}
