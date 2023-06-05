import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FabricMaterialWidthService } from '../../../services/product-constants/fabric-material-width.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-fabric-material-width',
  templateUrl: './fabric-material-width.component.html',
  styleUrls: ['./fabric-material-width.component.scss']
})
export class FabricMaterialWidthComponent implements OnInit{

  fabricMaterialWidthItems: ICalculatorChar[] = [];

  fabricMaterialWidthForm: FormGroup = new FormGroup({
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
    private readonly validationService: ValidationService,
    private readonly fabricMaterialWidthService: FabricMaterialWidthService,
    private readonly snackbar: MatSnackBar,
    private readonly snackbarConfigService: SnackbarConfigService
  ){}

  ngOnInit(): void {
    this.initFabricMaterialWidthItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneFabricMaterialWidthItem();
    else 
      this.createOneFabricMaterialWidthItem();
  }

  public edit(item: ICalculatorChar){
    this.fabricMaterialWidthForm.patchValue(item);
  }

  public delete(id: number){
    this.fabricMaterialWidthService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.fabricMaterialWidthItems = this.fabricMaterialWidthItems.filter((el) => el.id !== id);
        this.fabricMaterialWidthForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private isEditMode(): boolean{
    return !!this.fabricMaterialWidthForm.get('id')?.value;
  }
  
  private createOneFabricMaterialWidthItem(){
    this.fabricMaterialWidthService
    .createOneItem(this.fabricMaterialWidthForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.fabricMaterialWidthItems.push({name, price: +price, id});
        this.fabricMaterialWidthForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private updateOneFabricMaterialWidthItem(){
    const obj: ICalculatorChar = {
      name: this.fabricMaterialWidthForm.get('name')?.value,
      price: +this.fabricMaterialWidthForm.get('price')?.value,
      id: +this.fabricMaterialWidthForm.get('id')?.value,
    };

    this.fabricMaterialWidthService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.fabricMaterialWidthItems = this.fabricMaterialWidthItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initFabricMaterialWidthItems(): void{
    this.fabricMaterialWidthService
    .getAllItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => this.fabricMaterialWidthItems = data,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }


}
