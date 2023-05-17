import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { ProfileService } from '../../../services/product-constants/profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  profileItems: ICalculatorChar[] = [];


  profileForm: FormGroup = new FormGroup({
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
    private readonly profileService: ProfileService
  ){

  }

  ngOnInit(): void {
    this.initProfileItems();
  }

  public submit(): void {
    if(this.isEditMode()) this.updateOneProfileItem();
    else this.createOneProfileItem();
  }

  public edit(item: ICalculatorChar): void{
    this.profileForm.patchValue(item);
  }

  public delete(id: number) {
    this.profileService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.profileItems = this.profileItems.filter(
          (el) => el.id !== id
        );
        this.profileForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneProfileItem(): void{
    this.profileService
    .createOneItem(this.profileForm.value)
    .subscribe({
      next: ({ name, price, id }: ICalculatorChar) => {
        if(price)
        this.profileItems.push({ name, price: +price, id });
        this.profileForm.reset();
      },
      error: (err: Error) =>
        this.snackbarConfigService.openSnackBar(err.message),
    })
  }

  private updateOneProfileItem(): void{
    const obj: ICalculatorChar = {
      name: this.profileForm.get('name')?.value,
      id: +this.profileForm.get('id')?.value
    }

    this.profileService.
    updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.profileItems = this.profileItems.map((el) => 
          el.id === id 
          ? { ...el, name, price } 
          : el);
      },
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err)
    })
  }

  private initProfileItems(): void{
    this.profileService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.profileItems = items),
      error: (err: HttpErrorResponse) => 
        this.snackbarConfigService.showError(err),
    })
  }

  private isEditMode(): boolean {
    return !!this.profileForm.get('id')?.value;
  }

}
