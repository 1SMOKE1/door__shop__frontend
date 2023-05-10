import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { DoorSlidingSystemService } from '../../../services/product-constants/door-sliding-system.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dsf-door-sliding-system',
  templateUrl: './door-sliding-system.component.html',
  styleUrls: ['./door-sliding-system.component.scss']
})
export class DoorSlidingSystemComponent implements OnInit{

  doorSlidingSystemItems: ICalculatorChar[] = [];

  doorSlidingSystemForm: FormGroup = new FormGroup({
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
    private readonly snackbar: MatSnackBar,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorSlidingSystemService: DoorSlidingSystemService
  ){}

  ngOnInit(): void {
    this.initDoorSlidingSystemItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneDoorSlidingSystem()
    else 
      this.createOneDoorSlidingSystem()
  }

  public edit(item: ICalculatorChar){
    this.doorSlidingSystemForm.patchValue(item);
  }

  public delete(id: number){
    this.doorSlidingSystemService
    .deleteDoorSlidingSystemItem(id)
    .subscribe({
      next: (message: string) => {
        this.openSnackBar(message);
        this.doorSlidingSystemItems = this.doorSlidingSystemItems.filter((el) => el.id !== id);
        this.doorSlidingSystemForm.reset();
      },
      error: (err: Error) => this.openSnackBar(err.message)
    })
  }

  private createOneDoorSlidingSystem(){
    this.doorSlidingSystemService
    .createDoorSlidingSystemItem(this.doorSlidingSystemForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.doorSlidingSystemItems.push({name, price: +price, id});
        this.doorSlidingSystemForm.reset();
      },
      error: (err: Error) => this.openSnackBar(err.message)
    });
  }

  private updateOneDoorSlidingSystem(){
    const obj: ICalculatorChar = {
      name: this.doorSlidingSystemForm.get('name')?.value,
      price: +this.doorSlidingSystemForm.get('price')?.value,
      id: +this.doorSlidingSystemForm.get('id')?.value,
    };

    this.doorSlidingSystemService
    .updateDoorSlidingSystemItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.doorSlidingSystemItems = this.doorSlidingSystemItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: Error) => this.openSnackBar(err.message)
    });
  }



  private isEditMode(): boolean{
    return !!this.doorSlidingSystemForm.get('id')?.value;
  }

  private initDoorSlidingSystemItems(){
    this.doorSlidingSystemService
    .getDoorSlidingSystemItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => this.doorSlidingSystemItems = data,
      error: (err: Error) => this.openSnackBar(err.message)
    })
  }

  private openSnackBar(message: string){
    this.snackbar.open(message, 'X', this.snackbarConfigService.getSnackBarConfig());
  }
}
