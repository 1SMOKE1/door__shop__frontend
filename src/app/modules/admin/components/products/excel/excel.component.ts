import { Component } from '@angular/core';

@Component({
  selector: 'dsf-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent {

  imagesFileList: FileList | null = null;

  public readFile(e: Event){
    const cur = e.target as HTMLInputElement;
    if(cur.files)
     console.log(cur.files[0])
  }

  public onImagesFolderSelected(e: Event){
    const cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }
}
