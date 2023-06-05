import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ICarouselImage } from '../../../interfaces/carousel-image.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { OurWorksService } from '../../../services/our-works.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-our-works-dialog',
  templateUrl: './our-works-dialog.component.html',
  styleUrls: ['./our-works-dialog.component.scss']
})
export class OurWorksDialogComponent implements OnInit{
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(

    @Inject(MAT_DIALOG_DATA) public ourWorkImage: ICarouselImage,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly ourWorkService: OurWorksService
    
  ) { }

  ngOnInit(): void {
    if(this.isEditMode())
      this.imagePreview = this.ourWorkImage.imgSrc;
    
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
      this.updateOurWorkImage();
    else
      this.createOurWorkImage();
  }

  private createOurWorkImage(): void{
    this.ourWorkService
    .createOurWorkItem(this.image)
    .subscribe({
      next: () => this.snackbarConfigService.openSnackBar('Зображення було додано успішно'),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private updateOurWorkImage(): void{
    if(this.ourWorkImage.id)
    this.ourWorkService
    .updateOurWorkItem(this.ourWorkImage.id, this.image)
    .subscribe({
      next: () => this.snackbarConfigService.openSnackBar('Зображення було змінено успішно'),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  public isEditMode(): boolean{
    return !!this.ourWorkImage;
  }
}
