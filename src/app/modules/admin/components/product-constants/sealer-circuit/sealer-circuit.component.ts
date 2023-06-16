import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { SealerCircuitService } from '../../../services/product-constants/sealer-circuit.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-sealer-circuit',
  templateUrl: './sealer-circuit.component.html',
  styleUrls: ['./sealer-circuit.component.scss']
})
export class SealerCircuitComponent implements OnInit{

  sealerCircuitItems: ICalculatorChar[] = [];

  sealerCircuitForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id: new FormControl(null),
  });

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly sealerCircuitService: SealerCircuitService
  ){}

  ngOnInit(): void {
    this.initSealerCircuitItems();
  }

  public submit(): void{
    if(this.isEditMode()) this.updateOneSealerCircuitItem();
    else this.createOneSealerCircuitItem();
   }
 
   public edit(item: ICalculatorChar): void{
     this.sealerCircuitForm.patchValue(item);
   }

  public delete(id: number): void{
    this.sealerCircuitService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.sealerCircuitItems = this.sealerCircuitItems.filter((el) => el.id !== id);
        this.sealerCircuitForm.reset();
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private createOneSealerCircuitItem(): void{
    this.sealerCircuitService
    .createOneItem(this.sealerCircuitForm.value)
    .subscribe({
      next: ({ name, id }: ICalculatorChar) => {
        this.sealerCircuitItems.push({ name, id });
        this.sealerCircuitForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneSealerCircuitItem(): void{
    const obj: ICalculatorChar = {
      name: this.sealerCircuitForm.get('name')?.value,
      id: +this.sealerCircuitForm.get('id')?.value
    }

    this.sealerCircuitService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.sealerCircuitItems = this.sealerCircuitItems.map((el) => 
          el.id === id ? { ...el, name } : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initSealerCircuitItems(): void{
    this.sealerCircuitService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.sealerCircuitItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.sealerCircuitForm.get('id')?.value;
  }
}
