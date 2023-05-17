import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { DoorSlidingSystemService } from '../../../services/product-constants/door-sliding-system.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorSlidingSystemItems = this.doorSlidingSystemItems.filter((el) => el.id !== id);
        this.doorSlidingSystemForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private createOneDoorSlidingSystem(){
    this.doorSlidingSystemService
    .createOneItem(this.doorSlidingSystemForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.doorSlidingSystemItems.push({name, price: +price, id});
        this.doorSlidingSystemForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private updateOneDoorSlidingSystem(){
    const obj: ICalculatorChar = {
      name: this.doorSlidingSystemForm.get('name')?.value,
      price: +this.doorSlidingSystemForm.get('price')?.value,
      id: +this.doorSlidingSystemForm.get('id')?.value,
    };

    this.doorSlidingSystemService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.doorSlidingSystemItems = this.doorSlidingSystemItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }



  private isEditMode(): boolean{
    return !!this.doorSlidingSystemForm.get('id')?.value;
  }

  private initDoorSlidingSystemItems(){
    this.doorSlidingSystemService
    .getAllItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => this.doorSlidingSystemItems = data,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }


}
