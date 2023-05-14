import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { DoorIsolationService } from '../../../services/product-constants/door-isolation.service';

@Component({
  selector: 'dsf-door-isolation',
  templateUrl: './door-isolation.component.html',
  styleUrls: ['./door-isolation.component.scss']
})
export class DoorIsolationComponent implements OnInit{

  doorIsolationItems: ICalculatorChar[] = [];

  doorIsolationForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'id': new FormControl(null)
  });

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorIsolationService: DoorIsolationService
  ){}

  ngOnInit(): void {
    this.initDoorIsolationItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneDoorIsolationItem();
    else 
      this.createOneDoorIsolationItem();
  }

  public edit(item: ICalculatorChar){
    this.doorIsolationForm.patchValue(item);
  }

  public delete(id: number){
    this.doorIsolationService
    .deleteOneDoorIsolationItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorIsolationItems = this.doorIsolationItems.filter((el) => el.id !== id);
        this.doorIsolationForm.reset();
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private createOneDoorIsolationItem(){
    this.doorIsolationService
    .createOneDoorIsolationItem(this.doorIsolationForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorIsolationItems.push({name, id});
        this.doorIsolationForm.reset();
      },
      error: (err: Error) => {
        this.snackbarConfigService.openSnackBar(err.message);
      }
    })
  }

  private updateOneDoorIsolationItem(){
    const obj: ICalculatorChar = {
      name: this.doorIsolationForm.get('name')?.value,
      id: +this.doorIsolationForm.get('id')?.value,
    };

    this.doorIsolationService
    .updateOneDoorIsolationItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorIsolationItems = this.doorIsolationItems
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
    this.doorIsolationService
    .getAllDoorIsolationItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.doorIsolationItems = items,
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorIsolationForm.get('id')?.value;
  }
}
