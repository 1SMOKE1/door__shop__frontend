import { Component, OnInit } from '@angular/core';
import { ICarouselImage } from '../../interfaces/carousel-image.interface';
import { MatDialog } from '@angular/material/dialog';
import { OurWorksService } from '../../services/our-works.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { OurWorksDialogComponent } from './our-works-dialog/our-works-dialog.component';
import { OurCommentsDialogComponent } from './our-comments-dialog/our-comments-dialog.component';
import { OurCommentsService } from '../../services/our-comments.service';


@Component({
  selector: 'dsf-admin-our-works',
  templateUrl: './admin-our-works.component.html',
  styleUrls: ['./admin-our-works.component.scss']
})
export class AdminOurWorksComponent implements OnInit{

  ourWorkItems: ICarouselImage[] = [];
  ourCommentItems: ICarouselImage[] = [];
  text: string = '';
  constructor(
    private readonly dialog: MatDialog,
    private readonly ourWorkService: OurWorksService,
    private readonly ourCommentsService: OurCommentsService,
    private readonly snackbarConfigService: SnackbarConfigService,
    
  ) {}

  ngOnInit(): void {
    this.initOurWorksItems();
    this.initOurCommentsItems();
  }

  public openOurWorksDialog(): void{
    const dialogRef = this.dialog.open(OurWorksDialogComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initOurWorksItems());
  }

  public openOurCommentsDialog(): void{
    const dialogRef = this.dialog.open(OurCommentsDialogComponent);

    dialogRef.afterClosed()
    .subscribe(() => this)
  }

  public updateWorks(image: ICarouselImage): void{
    const dialogRef = this.dialog.open(OurWorksDialogComponent, {
      data: image
    });
    dialogRef.afterClosed().subscribe(() => this.initOurWorksItems());
  }
  
  public updateComments(image: ICarouselImage): void{
    const dialogRef = this.dialog.open(OurCommentsDialogComponent, {
      data: image
    });
    dialogRef.afterClosed().subscribe(() => this.initOurCommentsItems());
  }

  public deleteWorks(id: number | undefined): void{
    if(id)
    this.ourWorkService
      .deleteOurWorkItem(id)
      .subscribe({
        next: () => this.ourWorkItems = this.ourWorkItems.filter((el: ICarouselImage) => el.id !== id),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      });
  }

  public deleteComments(id: number | undefined): void{
    if(id)
    this.ourCommentsService
      .deleteOurCommentItem(id)
      .subscribe({
        next: () => this.ourWorkItems = this.ourWorkItems.filter((el: ICarouselImage) => el.id !== id),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      });
  }

  private initOurWorksItems(): void{
    this.ourWorkService
    .getAllOurWorkItems()
    .subscribe({
      next: (items: ICarouselImage[]) => this.ourWorkItems = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initOurCommentsItems(): void{
    this.ourCommentsService
    .getAllOurCommentsItems()
    .subscribe({
      next: (items: ICarouselImage[]) => this.ourCommentItems = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }
}
