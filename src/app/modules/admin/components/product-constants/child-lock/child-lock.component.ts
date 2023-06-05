import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { ChildLockService } from '../../../services/product-constants/child-lock.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-child-lock',
  templateUrl: './child-lock.component.html',
  styleUrls: ['./child-lock.component.scss']
})
export class ChildLockComponent implements OnInit{

  childLockItems: ICalculatorChar[] = [];

  childLockForm: FormGroup = new FormGroup({
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
    private readonly childLockService: ChildLockService
  ){}

  ngOnInit(): void {
    this.initChildLockItems();
  }

  public submit(): void {
    if(this.isEditMode()) this.updateOneChildLockItem();
    else this.createOneChildLockItem();
  }

  public edit(item: ICalculatorChar){
    this.childLockForm.patchValue(item);
  }

  public delete(id: number){
    this.childLockService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.childLockItems = this.childLockItems.filter(
          (el) => el.id !== id
        );
        this.childLockForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneChildLockItem(): void{
    this.childLockService
    .createOneItem(this.childLockForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.childLockItems.push({ name, price: +price, id });
        this.childLockForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneChildLockItem(): void{
    const obj: ICalculatorChar = {
      name: this.childLockForm.get('name')?.value,
      id: +this.childLockForm.get('id')?.value
    }

    this.childLockService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.childLockItems = this.childLockItems.map((el) => 
          el.id === id 
          ? { ...el, name, price } 
          : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initChildLockItems(): void{
    this.childLockService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.childLockItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean{
    return !!this.childLockForm.get('id')?.value;
  }
}
