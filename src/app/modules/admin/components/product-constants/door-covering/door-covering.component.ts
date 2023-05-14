import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { DoorCoveringService } from '../../../services/product-constants/door-covering.service';

@Component({
  selector: 'dsf-door-covering',
  templateUrl: './door-covering.component.html',
  styleUrls: ['./door-covering.component.scss']
})
export class DoorCoveringComponent implements OnInit{

  doorCoveringItems: ICalculatorChar[] = [];

  doorCoveringForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    'id': new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly doorCoveringService: DoorCoveringService
  ){}

  ngOnInit(): void {
    this.initDoorCoveringItems();
  }

  public submit(){
    if(this.isEditMode())
      this.udpateOneDoorCoveringItem();
    else
      this.createOneDoorIsolationItem();
  }

  public edit(item: ICalculatorChar){
    this.doorCoveringForm.patchValue(item);
  }

  public delete(id: number){
    this.doorCoveringService
    .deleteOneDoorCoveringItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.doorCoveringItems = this.doorCoveringItems.filter((el) => el.id !== id);
        this.doorCoveringForm.reset();
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private createOneDoorIsolationItem(){
    this.doorCoveringService
    .createOneDoorCoveringItem(this.doorCoveringForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorCoveringItems.push({name, id});
        this.doorCoveringForm.reset();
      },
      error: (err: Error) =>  this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private udpateOneDoorCoveringItem(){
    const obj: ICalculatorChar = {
      name: this.doorCoveringForm.get('name')?.value,
      id: +this.doorCoveringForm.get('id')?.value,
    };

    this.doorCoveringService
    .updateOneDoorCoveringItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.doorCoveringItems = this.doorCoveringItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    });
  }

  private initDoorCoveringItems(): void{
    this.doorCoveringService
    .getAllDoorCoveringItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.doorCoveringItems = items,
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private isEditMode(): boolean{
    return !!this.doorCoveringForm.get('id')?.value;
  }
}
