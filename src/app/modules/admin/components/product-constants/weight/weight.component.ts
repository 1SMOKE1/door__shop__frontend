import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { WeightService } from '../../../services/product-constants/weight.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit{

  doorWeightItems: ICalculatorChar[] = [];

  doorWeightForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id: new FormControl(null),
  });

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorWeightService: WeightService
  ){}

  ngOnInit(): void {
    this.initDoorWeightItems();
  }

  public submit(): void{
   if(this.isEditMode()) this.updateOneDoorWeightItem();
   else this.createOneDoorWeightItem();
  }

  public edit(item: ICalculatorChar): void{
    this.doorWeightForm.patchValue(item);
  }

  public delete(id: number): void{
    this.doorWeightService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorWeightItems = this.doorWeightItems.filter((el) => el.id !== id);
        this.doorWeightForm.reset();
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private createOneDoorWeightItem(): void{
    this.doorWeightService
    .createOneItem(this.doorWeightForm.value)
    .subscribe({
      next: ({ name, id }: ICalculatorChar) => {
        this.doorWeightItems.push({ name, id });
        this.doorWeightForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneDoorWeightItem(): void{
    const obj: ICalculatorChar = {
      name: this.doorWeightForm.get('name')?.value,
      id: +this.doorWeightForm.get('id')?.value
    }

    this.doorWeightService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorWeightItems = this.doorWeightItems.map((el) => 
          el.id === id ? { ...el, name } : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initDoorWeightItems(): void{
    this.doorWeightService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorWeightItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.doorWeightForm.get('id')?.value;
  }
  
}
