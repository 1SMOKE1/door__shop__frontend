import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { OurCommentsService } from '../../../services/our-comments.service';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICarouselImage } from '../../../interfaces/carousel-image.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-our-comments-dialog',
  templateUrl: './our-comments-dialog.component.html',
  styleUrls: ['./our-comments-dialog.component.scss']
})
export class OurCommentsDialogComponent implements OnInit{
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    private readonly ourCommentService: OurCommentsService,
    private readonly snackbarConfigService: SnackbarConfigService,
    @Inject(MAT_DIALOG_DATA) public ourCommentImage: ICarouselImage
  ){}

  ngOnInit(): void {
    if(this.isEditMode())
      this.imagePreview = this.ourCommentImage.imgSrc;
  }

  public triggerInput(): void{
    this.inputFile.nativeElement.click();
  }

  public onFileUpload(e: Event): void{
    let cur = e.target as any;

    const file = cur.files[0];


    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }

    reader.readAsDataURL(file);
  }

  public submit(): void{
    if(this.isEditMode())
      this.updateOurCommentImage();
    else
      this.createOurCommentImage();
  }

  private createOurCommentImage(): void{
    this.ourCommentService
    .createOutCommentImage(this.image)
    .subscribe({
      next: () => this.snackbarConfigService.openSnackBar('Зображення було додано успішно'),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private updateOurCommentImage(): void{
    if(this.ourCommentImage.id)
    this.ourCommentService
    .updateOutCommentImage(this.ourCommentImage.id, this.image)
    .subscribe({
      next: () => this.snackbarConfigService.openSnackBar('Зображення було змінено успішно'),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }



  public isEditMode(): boolean{
    return !!this.ourCommentImage;
  }
}
