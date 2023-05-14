import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { DoorInsulationService } from '../../../services/product-constants/door-insulation.service';

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
    .deleteOneDoorInsulationItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorInsulationItems = this.doorInsulationItems.filter((el) => el.id !== id);
        this.doorInsulationForm.reset();
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private createOneDoorIsolationItem(){
    this.doorInsulationService
    .createOneDoorInsulationItem(this.doorInsulationForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorInsulationItems.push({name, id});
        this.doorInsulationForm.reset();
      },
      error: (err: Error) =>  this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private updateOneDoorInsulationItem(){
    const obj: ICalculatorChar = {
      name: this.doorInsulationForm.get('name')?.value,
      id: +this.doorInsulationForm.get('id')?.value,
    };

    this.doorInsulationService
    .updateOneDoorInsulationItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorInsulationItems = this.doorInsulationItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    });
  }

  private initDoorIsolationItems(): void{
    this.doorInsulationService
    .getAllDoorInsulationItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.doorInsulationItems = items,
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorInsulationForm.get('id')?.value;
  }


}
