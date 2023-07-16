import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ExcelService } from '@modules/admin/services/excel/excel.service';
import { FiltrationService } from '@modules/share/services/filtration.service';
import { SidebarService } from '@modules/share/services/sidebar.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';

@Component({
  selector: 'dsf-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent {

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly excelService: ExcelService,
    private readonly sidebarService: SidebarService
  ){}

  imagesFileList: FileList | null = null;
  excel: File | null = null;

  public readFile(e: Event){
    const cur = e.target as HTMLInputElement;
    this.excel = cur.files ? cur.files[0] : null;
  }

  public onImagesFolderSelected(e: Event){
    const cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  private sendExcelAndPhotos(): void{
    this.excelService
    .sendExcelAndPhotos({
      excel: this.excel,
      images: this.imagesFileList
    })
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
}
