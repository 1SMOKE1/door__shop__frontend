import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarouselImage } from '../../interfaces/common/carousel-image.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'dsf-owl-carousel',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.scss'],
})
export class OwlCarouselComponent {
  @Input('images') public images$!: Observable<any>;
  constructor() {}
  images: ICarouselImage[] = [];
  ngOnInit(): void {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
  };

  private getImages(): void {
    this.images$?.subscribe((res: ICarouselImage[]) => (this.images = res));
  }

  ngAfterViewInit(): void {
    this.getImages();
  }
}