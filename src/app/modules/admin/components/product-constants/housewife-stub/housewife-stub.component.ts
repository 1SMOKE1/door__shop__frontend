import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { HousewifeStubService } from '../../../services/product-constants/housewife-stub.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-housewife-stub',
  templateUrl: './housewife-stub.component.html',
  styleUrls: ['./housewife-stub.component.scss']
})
export class HousewifeStubComponent implements OnInit{

  housewifeStubItems: ICalculatorChar[] = [];

  housewifeStubForm: FormGroup = new FormGroup({
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
    private readonly housewifeStubService: HousewifeStubService
  ){}

  ngOnInit(): void {
    this.inithousewifeStubItems();
  }

  public submit(): void {
    if(this.isEditMode()) this.updateOneHouseWifeStubItem();
    else this.createOneHouseWifeStubItem();
  }

  public edit(item: ICalculatorChar){
    this.housewifeStubForm.patchValue(item);
  }

  public delete(id: number){
    this.housewifeStubService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.housewifeStubItems = this.housewifeStubItems.filter(
          (el) => el.id !== id
        );
        this.housewifeStubForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneHouseWifeStubItem(): void{
    this.housewifeStubService
    .createOneItem(this.housewifeStubForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.housewifeStubItems.push({ name, price: +price, id });
        this.housewifeStubForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneHouseWifeStubItem(): void{
    const obj: ICalculatorChar = {
      name: this.housewifeStubForm.get('name')?.value,
      id: +this.housewifeStubForm.get('id')?.value
    }

    this.housewifeStubService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.housewifeStubItems = this.housewifeStubItems.map((el) => 
          el.id === id 
          ? { ...el, name, price } 
          : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private inithousewifeStubItems(): void{
    this.housewifeStubService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.housewifeStubItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean{
    return !!this.housewifeStubForm.get('id')?.value;
  }
}
