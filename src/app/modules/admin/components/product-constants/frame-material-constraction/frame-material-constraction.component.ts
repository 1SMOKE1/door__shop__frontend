import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { FrameMaterialConstractionService } from '../../../services/product-constants/frame-material-constraction.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-frame-material-constraction',
  templateUrl: './frame-material-constraction.component.html',
  styleUrls: ['./frame-material-constraction.component.scss']
})
export class FrameMaterialConstractionComponent implements OnInit{

  frameMaterialConstractionItems: ICalculatorChar[] = [];

  frameMaterialConstractionForm: FormGroup =  new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id: new FormControl(null),
  })
  
  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly frameMaterialConstractionService: FrameMaterialConstractionService
  ){}

  ngOnInit(): void {
    this.initFrameMaterialConstractionItems();
  }

  public submit(): void{
    if(this.isEditMode()) this.updateOneFrameMaterialConstractionItem();
    else this.createOneFrameMaterialConstractionItem();
  }

  public edit(item: ICalculatorChar): void{
    this.frameMaterialConstractionForm.patchValue(item);
  }

  public delete(id: number): void{
    this.frameMaterialConstractionService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.frameMaterialConstractionItems = this.frameMaterialConstractionItems
        .filter((el) => el.id !== id);
        this.frameMaterialConstractionForm.reset();
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private createOneFrameMaterialConstractionItem(): void{
    this.frameMaterialConstractionService
    .createOneItem(this.frameMaterialConstractionForm.value)
    .subscribe({
      next: ({ name, id }: ICalculatorChar) => {
        this.frameMaterialConstractionItems.push({ name, id });
        this.frameMaterialConstractionForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneFrameMaterialConstractionItem(): void{
    const obj: ICalculatorChar = {
      name: this.frameMaterialConstractionForm.get('name')?.value,
      id: +this.frameMaterialConstractionForm.get('id')?.value
    }

    this.frameMaterialConstractionService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.frameMaterialConstractionItems = this.frameMaterialConstractionItems.map((el) => 
          el.id === id ? { ...el, name } : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initFrameMaterialConstractionItems(): void{
    this.frameMaterialConstractionService.
    getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.frameMaterialConstractionItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.frameMaterialConstractionForm.get('id')?.value;
  }
}
