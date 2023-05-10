import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFurniture } from 'src/app/modules/share/interfaces/common/furniture.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllFurniture(): Observable<IFurniture[]>{
    const url: string = `${this.baseUrl}/furniture`;

    return this.http.get<IFurniture[]>(url);
  }
}
