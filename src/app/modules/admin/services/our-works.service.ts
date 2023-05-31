import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICarouselImage } from '../interfaces/carousel-image.interface';
import { ICarouselImageResponse } from '../interfaces/carousel-image-response.interface';
import { ConvertingOurWorksClass } from '../utils/converting-our-works.class';


@Injectable({
  providedIn: 'root'
})
export class OurWorksService extends ConvertingOurWorksClass{

  baseUrl: string = `${environment.baseUrl}/our-works`;

  constructor(
    private readonly http: HttpClient
  ) {super() }

  public getAllOurWorkItems(): Observable<ICarouselImage[]>{
    const url: string = this.baseUrl;

    return this.http.get<ICarouselImageResponse[]>(url)
    .pipe(
      map((data: ICarouselImageResponse[]): ICarouselImage[] => 
        data.map((el: ICarouselImageResponse): ICarouselImage => 
          this.convertCarouselImage(el)))
    );
  }

  public createOurWorkItem(image: File | null): Observable<ICarouselImage>{
    const url: string = this.baseUrl;

    return this.http.post<ICarouselImageResponse>(url, this.initFormData(image))
    .pipe(
      map((el: ICarouselImageResponse): ICarouselImage => 
        this.convertCarouselImage(el))
    );
  }

  public updateOurWorkItem(id: number, image: File | null): Observable<ICarouselImage>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.put<ICarouselImageResponse>(url, this.initFormData(image))
    .pipe(
      map((el: ICarouselImageResponse): ICarouselImage => 
        this.convertCarouselImage(el))
    );
  }

  public deleteOurWorkItem(id: number): Observable<string>{
    const url: string = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url);
  }
}
