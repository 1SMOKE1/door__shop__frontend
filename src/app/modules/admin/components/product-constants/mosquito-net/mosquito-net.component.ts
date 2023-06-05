import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { MosquitoNetService } from '../../../services/product-constants/mosquito-net.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from '@modules/share/services/common/validation.service';

@Component({
  selector: 'dsf-mosquito-net',
  templateUrl: './mosquito-net.component.html',
  styleUrls: ['./mosquito-net.component.scss']
})
export class MosquitoNetComponent implements OnInit{

  mosquitoNetItems:ICalculatorChar[] = [];

  mosquitoNetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    id: new FormControl(null),
  });
  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly validationService: ValidationService,
    private readonly mosquitoNetService: MosquitoNetService,
  ){}

  ngOnInit(): void {
    this.initMosquitoNetItems();
  }

  public submit() {
    if (this.isEditMode()) this.updateOneMosquitoNetItem();
    else this.createOneMosquitoNetItem();
  }

  public edit(item: ICalculatorChar) {
    this.mosquitoNetForm.patchValue(item);
  }

  public delete(id: number) {
    this.mosquitoNetService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.mosquitoNetItems = this.mosquitoNetItems.filter(
          (el) => el.id !== id
        );
        this.mosquitoNetForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneMosquitoNetItem() {
    this.mosquitoNetService
      .createOneItem(this.mosquitoNetForm.value)
      .subscribe({
        next: ({ name, price, id }: ICalculatorChar) => {
          if(price)
          this.mosquitoNetItems.push({ name, price: +price, id });
          this.mosquitoNetForm.reset();
        },
        error: (err: Error) =>
          this.snackbarConfigService.openSnackBar(err.message),
      });
  }

  private updateOneMosquitoNetItem() {
    const obj: ICalculatorChar = {
      name: this.mosquitoNetForm.get('name')?.value,
      id: +this.mosquitoNetForm.get('id')?.value,
    };

    this.mosquitoNetService.updateOneItem(obj).subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        this.mosquitoNetItems = this.mosquitoNetItems.map((el) =>
          el.id === id 
          ? { ...el, name, price } 
          : el
        );
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private initMosquitoNetItems(): void{
    this.mosquitoNetService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.mosquitoNetItems = items),
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.mosquitoNetForm.get('id')?.value;
  }
} 
