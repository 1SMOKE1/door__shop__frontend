import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { DoorSelectionBoardService } from '../../../services/product-constants/door-selection-board.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private readonly snackbar: MatSnackBar,
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
    .deleteOneDoorSelectionBoardItem(id)
    .subscribe({
      next: (message: string) => {
        this.openSnackBar(message);
        this.doorSelectionBoardItems = this.doorSelectionBoardItems.filter((el) => el.id !== id);
        this.doorSelectionBoardForm.reset();
      },
      error: (err: Error) => {
        this.openSnackBar(err.message);
      }
    })
  }

  private updateOneDoorSelectionBoardItem(){
    const obj: ICalculatorChar = {
      name: this.doorSelectionBoardForm.get('name')?.value,
      price: +this.doorSelectionBoardForm.get('price')?.value,
      id: +this.doorSelectionBoardForm.get('id')?.value,
    };

    this.doorSelectionBoardService
    .updateOneDoorSelectionBoardItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.doorSelectionBoardItems = this.doorSelectionBoardItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: Error) => {
        this.openSnackBar(err.message);
      }
    });
  }

  private createOneDoorSelectionBoardItem(){
    this.doorSelectionBoardService
    .createOneDoorSelectionBoardItem(this.doorSelectionBoardForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.doorSelectionBoardItems.push({name, price: +price, id});
        this.doorSelectionBoardForm.reset();
      },
      error: (err: Error) => {
        this.openSnackBar(err.message);
      }
    });
  }

  private isEditMode(): boolean{
    return !!this.doorSelectionBoardForm.get('id')?.value;
  }

  private initDoorSelectionBoardItems(){
    this.doorSelectionBoardService
    .getAllDoorSelectionBoardItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => {
        this.doorSelectionBoardItems = data;
      },
      error: (err: Error) => {
        this.openSnackBar(err.message);
      }
    })
  }

  private openSnackBar(message: string){
    this.snackbar.open(message, 'X', this.snackbarConfigService.getSnackBarConfig());
  }


}
