import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EnumExcelMethod } from '@modules/admin/enums/excel.method';
import { IExcelAndPhotos } from '@modules/admin/interfaces/excel-photos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  public sendExcelAndPhotos(data: IExcelAndPhotos, method: EnumExcelMethod): Observable<string>{
    const url: string = `${this.baseUrl}/excel-and-photos?method=${method}`;

    const formData = this.createFormData(data);

    return this.http.post<string>(url, formData);
  }

  private createFormData(data: IExcelAndPhotos): FormData{

    const formData = new FormData();
    const {excel, images} = data;
    if(excel)
    formData.append('excel', excel, excel.name);

    if(images)
    for(const image of images){
      formData.append('images', image)
    }

    return formData;
  }
}
