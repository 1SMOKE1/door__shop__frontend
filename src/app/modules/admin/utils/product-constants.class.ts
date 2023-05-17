import { HttpErrorResponse } from "@angular/common/http";
import { SnackbarConfigService } from "../../share/services/common/snackbar-config.service";
import { IProductConstantsClass } from "../interfaces/product-constants-class.interface";
import { ICalculatorChar } from "../interfaces/calculator-char.interface";
import { FormGroup } from "@angular/forms";

export class ProductConstants<S extends IProductConstantsClass, F extends FormGroup<any>>{

  public items: ICalculatorChar[]

  constructor(
    private readonly service: S,
    private readonly form: F,
    private readonly snackbarConfigService: SnackbarConfigService
  ){}

  protected getAllItems(): void{
    this.service.getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => this.items = items,
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  protected createOneItem(): void{
    this.service.createOneItem(this.form.value)
    .subscribe({
      next: ({name, id}: ICalculatorChar) => {
        this.items.push({name, id});
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  protected updateOneItem(): void{

    const obj: ICalculatorChar = {
      name: this.form.get('name')?.value,
      id: +this.form.get('id')?.value,
    };

    this.service.updateOneItem(obj).subscribe({
      next: ({ name, id}: ICalculatorChar) => {
        this.items = this.items.map((el) => 
          el.id === id ? { ...el, name } : el
        );
      },
      error: (err: HttpErrorResponse) =>
      this.snackbarConfigService.showError(err),
    })
  }

  

  
}