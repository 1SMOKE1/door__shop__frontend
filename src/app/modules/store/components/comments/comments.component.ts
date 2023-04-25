import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarouselImage } from 'src/app/modules/share/interfaces/common/carousel-image.interface';

@Component({
  selector: 'dsf-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  imagesOurWorks$: Observable<ICarouselImage[]>;
  imagesOurComments$: Observable<ICarouselImage[]>;
}
