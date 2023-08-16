import { EnumExcelMethod } from './../../../enums/excel.method';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExcelService } from '@modules/admin/services/excel/excel.service';
import { ProductsService } from '@modules/admin/services/products.service';
import { SidebarService } from '@modules/share/services/sidebar.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';

@Component({
  selector: 'dsf-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent {

  @ViewChild('fileInput') public fileInputRef: ElementRef;

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly excelService: ExcelService,
    private readonly sidebarService: SidebarService,
    private readonly productsService: ProductsService
  ){}

  imagesFileList: File[] = [];
  excel: File | null = null;
  method: EnumExcelMethod = EnumExcelMethod.CREATE;

  public readFile(e: Event){
    const cur = e.target as HTMLInputElement;
    this.excel = cur.files ? cur.files[0] : null;
  }

  public onImagesFolderSelected(e: Event){
    const cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = [...cur.files];

    if(this.productsService.checkImagesOnCorrectName(this.imagesFileList)){
      this.imagesFileList = [];
      this.fileInputRef.nativeElement.value = null;
      return;
    }
  }

  private sendExcelAndPhotos(): void{
    this.excelService
    .sendExcelAndPhotos({
      excel: this.excel,
      images: this.imagesFileList,
    }, 
    this.method)
    .subscribe({
      next: (answer: string) => {
        this.snackbarConfigService.openSnackBar(answer);
        this.sidebarService.doFiltration();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  public submit(){
    this.sendExcelAndPhotos();
  }

  public changeExcelMethod(e: Event) {
    const cur = e.target as HTMLInputElement;
    switch(true){
      case cur.id === 'add':
        this.method = EnumExcelMethod.CREATE;
        break;
      case cur.id === 'update':
        this.method = EnumExcelMethod.UPDATE;
        break;
    }
  }

  
}
