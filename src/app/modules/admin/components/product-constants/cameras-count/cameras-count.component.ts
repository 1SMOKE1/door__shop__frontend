import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CamerasCountService } from '../../../services/product-constants/cameras-count.service';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';

@Component({
  selector: 'dsf-cameras-count',
  templateUrl: './cameras-count.component.html',
  styleUrls: ['./cameras-count.component.scss']
})
export class CamerasCountComponent implements OnInit{

  camerasCountItems: ICalculatorChar[] = [];

  camerasCountForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    id: new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly camerasCountService: CamerasCountService
  ){}

  ngOnInit(): void {
    this.initCamerasCountItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneCamerasCountItem();
    else 
      this.createOneCamerasCountItem();
  }

  public edit(item: ICalculatorChar){
    this.camerasCountForm.patchValue(item);
  }

  public delete(id: number){
    this.camerasCountService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.camerasCountItems = this.camerasCountItems.filter((el) => el.id !== id);
        this.camerasCountForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private createOneCamerasCountItem(){
    this.camerasCountService
    .createOneItem(this.camerasCountForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.camerasCountItems.push({name, id});
        this.camerasCountForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private updateOneCamerasCountItem(){
    const obj: ICalculatorChar = {
      name: this.camerasCountForm.get('name')?.value,
      id: +this.camerasCountForm.get('id')?.value,
    };

    this.camerasCountService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.camerasCountItems = this.camerasCountItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initCamerasCountItems(): void{
    this.camerasCountService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.camerasCountItems = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private isEditMode(): boolean{
    return !!this.camerasCountForm.get('id')?.value;
  }
  

}
