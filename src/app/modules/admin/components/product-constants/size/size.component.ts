import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { SizeService } from '../../../services/product-constants/size.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent implements OnInit {
  doorSizeItems: ICalculatorChar[] = [];

  doorSizeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id: new FormControl(null),
  });

  constructor(
    private readonly doorSizeService: SizeService,
    private readonly snackbarConfigService: SnackbarConfigService,
  ) {

  }

  ngOnInit(): void {
    this.initDoorSizeItems();
  }

  public submit(): void {
    if (this.isEditMode()) this.updateOneDoorSizeItem();
    else this.createOneDoorSizeItem();
  }

  public edit(item: ICalculatorChar): void {
    this.doorSizeForm.patchValue(item);
  }

  public delete(id: number): void {
    this.doorSizeService.deleteOneItem(id).subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorSizeItems = this.doorSizeItems.filter((el) => el.id !== id);
        this.doorSizeForm.reset();
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createOneDoorSizeItem(): void {
    this.doorSizeService
      .createOneItem(this.doorSizeForm.value)
      .subscribe({
        next: ({ name, id }: ICalculatorChar) => {
          this.doorSizeItems.push({ name, id });
          this.doorSizeForm.reset();
        },
        error: (err: Error) =>
          this.snackbarConfigService.openSnackBar(err.message),
      });
  }

  private updateOneDoorSizeItem(): void {
    const obj: ICalculatorChar = {
      name: this.doorSizeForm.get('name')?.value,
      id: +this.doorSizeForm.get('id')?.value,
    };

    this.doorSizeService.updateOneItem(obj).subscribe({
      next: ({ name, id }: ICalculatorChar) => {
        this.doorSizeItems = this.doorSizeItems.map((el) =>
          el.id === id ? { ...el, name } : el
        );
      },
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private initDoorSizeItems(): void {
    this.doorSizeService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.doorSizeItems = items),
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private isEditMode(): boolean {
    return !!this.doorSizeForm.get('id')?.value;
  }
}
