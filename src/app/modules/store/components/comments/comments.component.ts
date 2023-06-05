import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarouselImage } from '@modules/admin/interfaces/carousel-image.interface';
import { OurCommentsService } from '@modules/admin/services/our-comments.service';
import { OurWorksService } from '@modules/admin/services/our-works.service';

@Component({
  selector: 'dsf-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  imagesOurWorks$: Observable<ICarouselImage[]>;
  imagesOurComments$: Observable<ICarouselImage[]>;

  constructor(
    private readonly ourWorkService: OurWorksService,
    private readonly ourCommentService: OurCommentsService
  ){
    this.imagesOurWorks$ = this.ourWorkService.getAllOurWorkItems();
    this.imagesOurComments$ = this.ourCommentService.getAllOurCommentsItems();
  }
}
