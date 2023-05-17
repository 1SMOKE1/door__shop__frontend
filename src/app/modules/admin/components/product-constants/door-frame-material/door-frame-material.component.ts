import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { DoorFrameMaterialService } from '../../../services/product-constants/door-frame-material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-door-frame-material',
  templateUrl: './door-frame-material.component.html',
  styleUrls: ['./door-frame-material.component.scss']
})
export class DoorFrameMaterialComponent implements OnInit{

  doorFrameMaterialItems: ICalculatorChar[] = [];

  doorFrameMaterialForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'price': new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    'id': new FormControl(null)
  });

  constructor(
    private readonly doorFrameMaterialService: DoorFrameMaterialService,
    private readonly validationService: ValidationService,
    private readonly snackbarConfigService: SnackbarConfigService
  ){}

  ngOnInit(): void {
    this.initDoorFrameMaterialItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateDoorFrameMaterialItem()
    else 
      this.createDoorFrameMaterialItem()
  }

  public edit(item: ICalculatorChar){
    this.doorFrameMaterialForm.patchValue(item);
  }

  public delete(id: number){
    this.doorFrameMaterialService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorFrameMaterialItems = this.doorFrameMaterialItems.filter((el) => el.id !== id);
        this.doorFrameMaterialForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private createDoorFrameMaterialItem(){
    this.doorFrameMaterialService
    .createOneItem(this.doorFrameMaterialForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.doorFrameMaterialItems.push({name, price: +price, id});
        this.doorFrameMaterialForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private updateDoorFrameMaterialItem(){
    const obj: ICalculatorChar = {
      name: this.doorFrameMaterialForm.get('name')?.value,
      price: +this.doorFrameMaterialForm.get('price')?.value,
      id: +this.doorFrameMaterialForm.get('id')?.value,
    };

    this.doorFrameMaterialService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.doorFrameMaterialItems = this.doorFrameMaterialItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorFrameMaterialItems(): void{
    this.doorFrameMaterialService
    .getAllItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => {
        this.doorFrameMaterialItems = data;
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }



  private isEditMode(): boolean{
    return !!this.doorFrameMaterialForm.get('id')?.value;
  }
}
