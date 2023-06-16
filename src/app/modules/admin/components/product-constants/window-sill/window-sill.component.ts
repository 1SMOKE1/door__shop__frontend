import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { WindowSillService } from '../../../services/product-constants/window-sill.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from '@share-services/validation.service';

@Component({
  selector: 'dsf-window-sill',
  templateUrl: './window-sill.component.html',
  styleUrls: ['./window-sill.component.scss']
})
export class WindowSillComponent implements OnInit{

  windowSillItems: ICalculatorChar[] = [];

  windowSillForm: FormGroup = new FormGroup({
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
    private readonly windowSillService: WindowSillService
  ){}

  ngOnInit(): void {
    this.initDoorWeightItems();
  }

  public submit(): void{
    if(this.isEditMode()) this.updateOneWindowSillItem();
    else this.createOneWindowSillItem();
  }

  public edit(item: ICalculatorChar): void{
    this.windowSillForm.patchValue(item);
  }

  public delete(id: number): void{
    this.windowSillService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.windowSillItems = this.windowSillItems.filter((el) => el.id !== id);
        this.windowSillForm.reset();
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private createOneWindowSillItem(): void{
    this.windowSillService
    .createOneItem(this.windowSillForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.windowSillItems.push({ name, price: +price, id });
        this.windowSillForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneWindowSillItem(): void{
    const obj: ICalculatorChar = {
      name: this.windowSillForm.get('name')?.value,
      id: +this.windowSillForm.get('id')?.value
    }

    this.windowSillService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.windowSillItems = this.windowSillItems.map((el) => 
          el.id === id 
          ? { ...el, name, price } 
          : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initDoorWeightItems(): void{
    this.windowSillService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.windowSillItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.windowSillForm.get('id')?.value;
  }
}
