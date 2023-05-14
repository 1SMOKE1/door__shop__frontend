import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { OpeningTypeService } from '../../../services/product-constants/opening-type.service';

@Component({
  selector: 'dsf-opening-type',
  templateUrl: './opening-type.component.html',
  styleUrls: ['./opening-type.component.scss']
})
export class OpeningTypeComponent implements OnInit{

  doorOpeningTypeItems: ICalculatorChar[] = [];

  doorOpeningTypeForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'id': new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorOpeningTypeService: OpeningTypeService,
  ){}

  ngOnInit(): void {
    this.initDoorOpeningTypeItems();
  }

  public submit(){
    if(this.isEditMode())
      this.udpateOneDoorOpeningTypeItem();
    else
      this.createOneDoorIsolationItem();
  }

  public edit(item: ICalculatorChar){
    this.doorOpeningTypeForm.patchValue(item);
  }

  public delete(id: number){
    this.doorOpeningTypeService
    .deleteOneOpeningTypeItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorOpeningTypeItems = this.doorOpeningTypeItems.filter((el) => el.id !== id);
        this.doorOpeningTypeForm.reset();
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private createOneDoorIsolationItem(){
    this.doorOpeningTypeService
    .createOneOpeningTypeItem(this.doorOpeningTypeForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorOpeningTypeItems.push({name, id});
        this.doorOpeningTypeForm.reset();
      },
      error: (err: Error) =>  this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private udpateOneDoorOpeningTypeItem(){
    const obj: ICalculatorChar = {
      name: this.doorOpeningTypeForm.get('name')?.value,
      id: +this.doorOpeningTypeForm.get('id')?.value,
    };

    this.doorOpeningTypeService
    .updateOneOpeningTypeItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorOpeningTypeItems = this.doorOpeningTypeItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    });
  }

  private initDoorOpeningTypeItems(): void{
    this.doorOpeningTypeService
    .getAllOpeningTypeItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.doorOpeningTypeItems = items,
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorOpeningTypeForm.get('id')?.value;
  }

  

}
