import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { DoorWeltService } from '../../../services/product-constants/door-welt.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';

@Component({
  selector: 'dsf-door-welt',
  templateUrl: './door-welt.component.html',
  styleUrls: ['./door-welt.component.scss']
})
export class DoorWeltComponent implements OnInit{

  doorWeltItems: ICalculatorChar[] = [];

  doorWeltForm: FormGroup = new FormGroup({
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
    private readonly doorWeltService: DoorWeltService
  ){}

  ngOnInit(): void {
    this.initDoorWeltItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneDoorWeltItem();
    else 
      this.createOneDoorWeltItem();
  }

  public edit(item: ICalculatorChar){
    this.doorWeltForm.patchValue(item);
  }

  public delete(id: number){
    this.doorWeltService
    .deleteOneDoorWeltItem(id)
    .subscribe({
      next: (message: string) => {
        this.openSnackBar(message);
        this.doorWeltItems = this.doorWeltItems.filter((el) => el.id !== id);
        this.doorWeltForm.reset();
      },
      error: (err: Error) => this.openSnackBar(err.message)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorWeltForm.get('id')?.value;
  }

  private createOneDoorWeltItem(){
    this.doorWeltService
    .createOneDoorWeltItem(this.doorWeltForm.value)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        if(price)
        this.doorWeltItems.push({name, price: +price, id});
        this.doorWeltForm.reset();
      },
      error: (err: Error) => this.openSnackBar(err.message)
    })
  }

  private updateOneDoorWeltItem(){
    const obj: ICalculatorChar = {
      name: this.doorWeltForm.get('name')?.value,
      price: +this.doorWeltForm.get('price')?.value,
      id: +this.doorWeltForm.get('id')?.value,
    };

    this.doorWeltService
    .updateOneDoorWeltItem(obj)
    .subscribe({
      next: ({name, price, id}: ICalculatorChar) => {
        this.doorWeltItems = this.doorWeltItems
        .map((el) => (
          el.id === id 
          ? {...el, name, price}
          : el
        ))
      },
      error: (err: Error) => this.openSnackBar(err.message)
    });
  }

  private initDoorWeltItems(): void{
    this.doorWeltService
    .getAllDoorWeltItems()
    .subscribe({
      next: (data: ICalculatorChar[]) => this.doorWeltItems = data,
      error: (err: Error) => this.openSnackBar(err.message)
    });
  }

  private openSnackBar(message: string){
    this.snackbar.open(message, 'X', this.snackbarConfigService.getSnackBarConfig());
  }
}
