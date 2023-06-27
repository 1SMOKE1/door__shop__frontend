import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@modules/share/services/sidebar.service';

@Component({
  selector: 'dsf-store-routing-outlet',
  templateUrl: './store-routing-outlet.component.html',
})
export class StoreRoutingOutletComponent {

  constructor(
    public readonly router: Router,
    private readonly sidebarService: SidebarService
  ){}

  ngOnInit(): void{
    this.sidebarService.doFiltration();
  }
}
