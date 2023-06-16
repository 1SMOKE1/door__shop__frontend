import { Component, OnInit } from '@angular/core';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { SectionCountService } from '../../../services/product-constants/section-count.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-section-count',
  templateUrl: './section-count.component.html',
  styleUrls: ['./section-count.component.scss']
})
export class SectionCountComponent implements OnInit{

  sectionCountItems: ICalculatorChar[] = [];

  sectionCountForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    id: new FormControl(null)
  })

  constructor(
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly sectionCountService: SectionCountService
  ){}

  ngOnInit(): void {
    this.initSectionCountItemsItems();
  }

  public submit(){
    if(this.isEditMode())
      this.updateOneFeaturesItem();
    else 
      this.createOneFeaturesItem();
  }

  public edit(item: ICalculatorChar){
    this.sectionCountForm.patchValue(item);
  }

  public delete(id: number){
    this.sectionCountService
    .deleteOneItem(id)
    .subscribe({
      next: (message: string) => {
        this.snackbarConfigService.openSnackBar(message);
        this.sectionCountItems = this.sectionCountItems.filter((el) => el.id !== id);
        this.sectionCountForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private createOneFeaturesItem(){
    this.sectionCountService
    .createOneItem(this.sectionCountForm.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.sectionCountItems.push({name, id});
        this.sectionCountForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private updateOneFeaturesItem(){
    const obj: ICalculatorChar = {
      name: this.sectionCountForm.get('name')?.value,
      id: +this.sectionCountForm.get('id')?.value,
    };

    this.sectionCountService
    .updateOneItem(obj)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.sectionCountItems = this.sectionCountItems
        .map((el) => (
          el.id === id 
          ? {...el, name}
          : el
        ))
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initSectionCountItemsItems(): void{
    this.sectionCountService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.sectionCountItems = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private isEditMode(): boolean{
    return !!this.sectionCountForm.get('id')?.value;
  }
}
