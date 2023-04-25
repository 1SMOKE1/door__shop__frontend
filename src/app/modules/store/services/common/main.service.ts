import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IZamirFormResponse } from '../../interfaces/response/zamir-form.interface';
import { catchError } from 'rxjs';
import { HandleConsultationFormsErrorService } from '../errors/handle-consultation-forms-error.service';
import { IConsultationFormResponse } from '../../interfaces/response/consultation-form.interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly handleErrorService: HandleConsultationFormsErrorService
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
      .post<IZamirFormResponse>(url, formData)
      .pipe(catchError(this.handleErrorService.handleErrorConsultationForms));
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
      .pipe(catchError(this.handleErrorService.handleErrorConsultationForms));
  }

  public successForm(name: string): string {
    return `${name}, ми отримали вашу заявку. Наш менеджер зв'яжеться із вами найближчим часом!`;
  }
}
