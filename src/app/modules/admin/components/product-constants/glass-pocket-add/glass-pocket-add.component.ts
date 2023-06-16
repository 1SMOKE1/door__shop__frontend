import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { ValidationService } from '@share-services/validation.service';
import { GlassPocketAddService } from '../../../services/product-constants/glass-pocket-add.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';

@Component({
  selector: 'dsf-glass-pocket-add',
  templateUrl: './glass-pocket-add.component.html',
  styleUrls: ['./glass-pocket-add.component.scss']
})
export class GlassPocketAddComponent implements OnInit{

  glassPocketAddItems: ICalculatorChar[] = [];

  glassPocketAddForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    id: new FormControl(null),
  })



  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly validationService: ValidationService,
    private readonly glassPocketAddService: GlassPocketAddService
  ){}

  ngOnInit(): void {
    this.initglassPocketAddItems();
  }

  public submit(): void {
    if(this.isEditMode()) this.updateOneGlassPocketAddItem();
    else this.createOneGlassPocketAddItem();
  }

  public edit(item: ICalculatorChar){
    this.glassPocketAddForm.patchValue(item);
  }

  public delete(id: number){
    this.glassPocketAddService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.glassPocketAddItems = this.glassPocketAddItems.filter(
          (el) => el.id !== id
        );
        this.glassPocketAddForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneGlassPocketAddItem(): void{
    this.glassPocketAddService
    .createOneItem(this.glassPocketAddForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.glassPocketAddItems.push({ name, price: +price, id });
        this.glassPocketAddForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneGlassPocketAddItem(): void{
    const obj: ICalculatorChar = {
      name: this.glassPocketAddForm.get('name')?.value,
      id: +this.glassPocketAddForm.get('id')?.value
    }

    this.glassPocketAddService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.glassPocketAddItems = this.glassPocketAddItems.map((el) => 
          el.id === id 
          ? { ...el, name, price } 
          : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initglassPocketAddItems(): void{
    this.glassPocketAddService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.glassPocketAddItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean{
    return !!this.glassPocketAddForm.get('id')?.value;
  }
}
