import { Component, OnInit } from '@angular/core';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { FeaturesService } from '../../../services/product-constants/features.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})

export class FeaturesComponent implements OnInit{

  featuresItems: ICalculatorChar[] = [];

  featuresForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    id: new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly featuresService: FeaturesService
  ){}

  ngOnInit(): void {
    this.initFeaturesItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneFeaturesItem();
    else 
      this.createOneFeaturesItem();
  }

  public edit(item: ICalculatorChar){
    this.featuresForm.patchValue(item);
  }

  public delete(id: number){
    this.featuresService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.featuresItems = this.featuresItems.filter((el) => el.id !== id);
        this.featuresForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private createOneFeaturesItem(){
    this.featuresService
    .createOneItem(this.featuresForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.featuresItems.push({name, id});
        this.featuresForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private updateOneFeaturesItem(){
    const obj: ICalculatorChar = {
      name: this.featuresForm.get('name')?.value,
      id: +this.featuresForm.get('id')?.value,
    };

    this.featuresService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.featuresItems = this.featuresItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initFeaturesItems(): void{
    this.featuresService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.featuresItems = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private isEditMode(): boolean{
    return !!this.featuresForm.get('id')?.value;
  }
}
