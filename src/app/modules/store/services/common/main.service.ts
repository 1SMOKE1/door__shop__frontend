import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IZamirFormResponse } from '../../interfaces/response/zamir-form.interface';
import { catchError } from 'rxjs';
import { IConsultationFormResponse } from '../../interfaces/response/consultation-form.interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) {}

  public sendZamirForm(
    formData: Partial<{
      name: string | null;
      phone: string | null;
      address: string | null;
    }>
  ) {
    const url: string = `${this.baseUrl}/forms/free-zamir`;

    return this.http
      .post<IZamirFormResponse>(url, formData);
  }

  public sendConsultationForm(
    formData: Partial<{
      name: string | null;
      phone: string | null;
    }>
  ) {
    const url: string = `${this.baseUrl}/forms/free-consultation`;

    return this.http
      .post<IConsultationFormResponse>(url, formData)
  }

  public successForm(name: string): string {
    return `${name}, ми отримали вашу заявку. Наш менеджер зв'яжеться із вами найближчим часом!`;
  }
}
