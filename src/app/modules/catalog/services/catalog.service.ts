import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  page: number = 1; // currentPage
  itemsPerPage: number = 8;

  constructor() { }
}
