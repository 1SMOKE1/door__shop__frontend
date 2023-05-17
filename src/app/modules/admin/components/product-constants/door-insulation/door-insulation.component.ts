import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { DoorInsulationService } from '../../../services/product-constants/door-insulation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-door-insulation',
  templateUrl: './door-insulation.component.html',
  styleUrls: ['./door-insulation.component.scss']
})
export class DoorInsulationComponent implements OnInit{

  doorInsulationItems: ICalculatorChar[] = [];

  doorInsulationForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'id': new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorInsulationService: DoorInsulationService
  ){}

  ngOnInit(): void {
    this.initDoorIsolationItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneDoorInsulationItem();
    else
      this.createOneDoorIsolationItem();
  }

  public edit(item: ICalculatorChar){
    this.doorInsulationForm.patchValue(item);
  }

  public delete(id: number){
    this.doorInsulationService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorInsulationItems = this.doorInsulationItems.filter((el) => el.id !== id);
        this.doorInsulationForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private createOneDoorIsolationItem(){
    this.doorInsulationService
    .createOneItem(this.doorInsulationForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorInsulationItems.push({name, id});
        this.doorInsulationForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private updateOneDoorInsulationItem(){
    const obj: ICalculatorChar = {
      name: this.doorInsulationForm.get('name')?.value,
      id: +this.doorInsulationForm.get('id')?.value,
    };

    this.doorInsulationService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorInsulationItems = this.doorInsulationItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorIsolationItems(): void{
    this.doorInsulationService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.doorInsulationItems = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorInsulationForm.get('id')?.value;
  }


}
