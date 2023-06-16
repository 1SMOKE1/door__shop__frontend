import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { WindowEbbService } from '../../../services/product-constants/window-ebb.service';
import { ValidationService } from '@share-services/validation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-window-ebb',
  templateUrl: './window-ebb.component.html',
  styleUrls: ['./window-ebb.component.scss']
})
export class WindowEbbComponent implements OnInit{

  windowEbbItems: ICalculatorChar[] = [];

  windowEbbForm: FormGroup = new FormGroup({
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
    private readonly windowEbbService: WindowEbbService
  ){}

  ngOnInit(): void {
    this.initWindowEbbItems();
  }

  public submit(): void {
    if(this.isEditMode()) this.updateOneWindowEbbItem();
    else this.createOneWindowEbbItem();
  }

  public edit(item: ICalculatorChar): void{
    this.windowEbbForm.patchValue(item);
  }

  public delete(id: number) {
    this.windowEbbService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.windowEbbItems = this.windowEbbItems.filter(
          (el) => el.id !== id
        );
        this.windowEbbForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneWindowEbbItem(): void{
    this.windowEbbService
    .createOneItem(this.windowEbbForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.windowEbbItems.push({ name, price: +price, id });
        this.windowEbbForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneWindowEbbItem(): void{
    const obj: ICalculatorChar = {
      name: this.windowEbbForm.get('name')?.value,
      id: +this.windowEbbForm.get('id')?.value
    }

    this.windowEbbService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.windowEbbItems = this.windowEbbItems.map((el) => 
          el.id === id 
          ? { ...el, name, price } 
          : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initWindowEbbItems(): void{
    this.windowEbbService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.windowEbbItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.windowEbbForm.get('id')?.value;
  }
}
