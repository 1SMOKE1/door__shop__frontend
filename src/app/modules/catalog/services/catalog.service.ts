import { Injectable } from '@angular/core';
import { SidebarService } from '@modules/share/services/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  page: number = 1; // currentPage
  itemsPerPage: number = 48;

  constructor(
    private readonly sidebarService: SidebarService
  ){

  }

  public checkCurrentPageCorrect(productsLength: number): boolean{

    const lastCorrectPage = Math.ceil(productsLength / this.itemsPerPage);

    const isCorrectPage = this.page > lastCorrectPage;

    if(isCorrectPage){
      this.page = lastCorrectPage;
    }

    return isCorrectPage
  }
}
