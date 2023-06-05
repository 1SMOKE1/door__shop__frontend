import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { DoorSelectionBoardService } from '../../../services/product-constants/door-selection-board.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-door-selection-board',
  templateUrl: './door-selection-board.component.html',
  styleUrls: ['./door-selection-board.component.scss']
})
export class DoorSelectionBoardComponent implements OnInit{

  doorSelectionBoardItems: ICalculatorChar[] = [];

  doorSelectionBoardForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'price': new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    'id': new FormControl(null)
  });

  constructor(
    private readonly validationService: ValidationService,
    private readonly doorSelectionBoardService: DoorSelectionBoardService,
    private readonly snackbarConfigService: SnackbarConfigService
  ){}

  ngOnInit(): void {
    this.initDoorSelectionBoardItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneDoorSelectionBoardItem();
    else 
      this.createOneDoorSelectionBoardItem();
  }

  public edit(item: ICalculatorChar){
    this.doorSelectionBoardForm.patchValue(item);
  }

  public delete(id: number){
    this.doorSelectionBoardService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorSelectionBoardItems = this.doorSelectionBoardItems.filter((el) => el.id !== id);
        this.doorSelectionBoardForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private updateOneDoorSelectionBoardItem(){
    const obj: ICalculatorChar = {
      name: this.doorSelectionBoardForm.get('name')?.value,
      price: +this.doorSelectionBoardForm.get('price')?.value,
      id: +this.doorSelectionBoardForm.get('id')?.value,
    };

    this.doorSelectionBoardService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.doorSelectionBoardItems = this.doorSelectionBoardItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private createOneDoorSelectionBoardItem(){
    this.doorSelectionBoardService
    .createOneItem(this.doorSelectionBoardForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.doorSelectionBoardItems.push({name, price: +price, id});
        this.doorSelectionBoardForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private isEditMode(): boolean{
    return !!this.doorSelectionBoardForm.get('id')?.value;
  }

  private initDoorSelectionBoardItems(){
    this.doorSelectionBoardService
    .getAllItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => {
        this.doorSelectionBoardItems = data;
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

}
