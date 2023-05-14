import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { SizeService } from '../../../services/product-constants/size.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dsf-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit{

  doorSizeItems: ICalculatorChar[] = [];

  doorSizeForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'id': new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorSizeService: SizeService
  ){}

  ngOnInit(): void {
    this.initDoorSizeItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneDoorSizeItem();
    else 
      this.createOneDoorSizeItem();
  }

  public edit(item: ICalculatorChar){
    this.doorSizeForm.patchValue(item);
  }

  public delete(id: number){
    this.doorSizeService
    .deleteOneDoorSizeItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorSizeItems = this.doorSizeItems.filter((el) => el.id !== id);
        this.doorSizeForm.reset();
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private createOneDoorSizeItem(){
    this.doorSizeService
    .createOneDoorSizeItem(this.doorSizeForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorSizeItems.push({name, id});
        this.doorSizeForm.reset();
      },
      error: (err: Error) =>  this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private updateOneDoorSizeItem(){
    const obj: ICalculatorChar = {
      name: this.doorSizeForm.get('name')?.value,
      id: +this.doorSizeForm.get('id')?.value,
    };

    this.doorSizeService
    .updateOneDoorSizeItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorSizeItems = this.doorSizeItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private initDoorSizeItems(){
    this.doorSizeService
    .getAllDoorSizeItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.doorSizeItems = items,
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorSizeForm.get('id')?.value;
  }
}
