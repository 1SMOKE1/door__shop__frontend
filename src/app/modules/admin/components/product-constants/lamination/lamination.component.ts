import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { LaminationService } from '../../../services/product-constants/lamination.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-lamination',
  templateUrl: './lamination.component.html',
  styleUrls: ['./lamination.component.scss']
})
export class LaminationComponent implements OnInit{

  laminationItems: ICalculatorChar[] = [];

  laminationForm: FormGroup = new FormGroup({
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
    private readonly laminationService: LaminationService
  ){}

  ngOnInit(): void {
    this.initlaminationItems();
  }

  public submit() {
    if(this.isEditMode()) this.updateOneLaminationItem();
    else this.createOneLaminationItem();
  }

  public edit(item: ICalculatorChar){
    this.laminationForm.patchValue(item);
  }

  public delete(id: number) {
    this.laminationService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.laminationItems = this.laminationItems.filter(
          (el) => el.id !== id
        );
        this.laminationForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }


  private createOneLaminationItem(): void {
    this.laminationService
    .createOneItem(this.laminationForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.laminationItems.push({ name, price: +price, id });
        this.laminationForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneLaminationItem(): void {
    const obj: ICalculatorChar = {
      name: this.laminationForm.get('name')?.value,
      id: +this.laminationForm.get('id')?.value,
    };

    this.laminationService.updateOneItem(obj).subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        this.laminationItems = this.laminationItems.map((el) =>
          el.id === id 
          ? { ...el, name, price } 
          : el
        );
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private initlaminationItems(): void{
    this.laminationService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.laminationItems = items),
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.laminationForm.get('id')?.value;
  }
}
