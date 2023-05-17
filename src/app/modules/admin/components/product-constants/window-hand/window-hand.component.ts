import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { WindowHandService } from '../../../services/product-constants/window-hand.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-window-hand',
  templateUrl: './window-hand.component.html',
  styleUrls: ['./window-hand.component.scss']
})
export class WindowHandComponent implements OnInit{

  windowHandItems: ICalculatorChar[] = [];

  windowHandForm: FormGroup = new FormGroup({
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
    private readonly doorHandService: WindowHandService
  ){}

  ngOnInit(): void {
    this.initWindowHandItems();
  }

  public submit() {
    if(this.isEditMode()) this.updateOneWindowHandItem();
    else this.createOneWindowHandItem();
  }

  public edit(item: ICalculatorChar){
    this.windowHandForm.patchValue(item);
  }

  public delete(id: number) {
    this.doorHandService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.windowHandItems = this.windowHandItems.filter(
          (el) => el.id !== id
        );
        this.windowHandForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneWindowHandItem(): void {
    this.doorHandService
    .createOneItem(this.windowHandForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.windowHandItems.push({ name, price: +price, id });
        this.windowHandForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneWindowHandItem(): void {
    const obj: ICalculatorChar = {
      name: this.windowHandForm.get('name')?.value,
      id: +this.windowHandForm.get('id')?.value,
    };

    this.doorHandService.updateOneItem(obj).subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        this.windowHandItems = this.windowHandItems.map((el) =>
          el.id === id 
          ? { ...el, name, price } 
          : el
        );
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private initWindowHandItems(): void{
    this.doorHandService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.windowHandItems = items),
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.windowHandForm.get('id')?.value;
  }
}
