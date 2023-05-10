import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dsf-admin-router-outlet',
  templateUrl: './admin-router-outlet.component.html',
})
export class AdminRouterOutletComponent {

  constructor(
    public readonly router: Router
  ){}


}
