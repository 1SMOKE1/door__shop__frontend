import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IProductProducer } from '@modules/share/interfaces/common/product-producer.interface';
import { ITypeOfProductResponse } from '@modules/share/interfaces/response/type-of-product.interface';
import { HttpProductProducerService } from '@share-services/http-product-producer.service';
import { HttpTypeOfProductService } from '@share-services/http-type-of-product.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';

@Component({
  selector: 'dsf-product-producers',
  templateUrl: './product-producers.component.html',
  styleUrls: ['./product-producers.component.scss'],
})
export class ProductProducersComponent implements OnInit {
  curProductProducer: IProductProducer | null = null;

  productProducerItems: IProductProducer[] = [];
  typeOfProductItems: ITypeOfProductResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductProducersComponent>,
    private readonly productProducerService: HttpProductProducerService,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly typeOfProductsService: HttpTypeOfProductService
  ) {}

  $editEvent: Function = (
    productProducer: IProductProducer
  ): Observable<null> =>
    new Observable((suber) => {
      this.productProducerForm.patchValue(productProducer);
      suber.next(null);
    });

  ngOnInit(): void {
    this.initProductProducerItems();
    this.initTypeOfProductItems();
    this.clearFormIfNotEditing();
  }

  productProducerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    typeOfProductName: new FormControl({ value: '', disabled: false }),
    id: new FormControl(0),
  });

  public edit(item: IProductProducer) {
    const obs: Observable<null> = this.$editEvent(item);
    obs.subscribe(() => {
      this.productProducerForm.controls['typeOfProductName'].disable();
      this.productProducerForm
        .get('typeOfProductName')
        ?.patchValue(item.typeOfProduct.name);
    });
  }

  public submit() {
    if (this.isEditMode()) this.updateProductProducer();
    else this.createProductProducer();
  }

  public closeDialog() {
    this.dialogRef.close(this.productProducerForm.value);
  }

  public delete(id: number) {
    this.productProducerService.deleteProductProducer(id).subscribe({
      next: (answer: string) => {
        this.snackbarConfigService.openSnackBar(answer);
        this.productProducerItems = this.productProducerItems.filter(
          (el) => el.id !== id
        );
        this.productProducerForm.reset();
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err),
    });
  }

  private isEditMode(): boolean {
    return !!this.productProducerForm.get('id')?.value;
  }

  private clearFormIfNotEditing(): void {
    this.productProducerForm
      .get('name')
      ?.valueChanges.subscribe((value: string) => {
        if (value === '') {
          this.productProducerForm.reset();
          this.productProducerForm.controls['typeOfProductName'].enable();
        }
      });
  }

  private initProductProducerItems(): void {
    this.productProducerService.getProductProducers().subscribe({
      next: (productProducers: IProductProducer[]) =>
        (this.productProducerItems = productProducers),
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private initTypeOfProductItems(): void {
    this.typeOfProductsService.getAllTypeOfProducts().subscribe({
      next: (typeOfProducts: ITypeOfProductResponse[]) =>
        (this.typeOfProductItems = typeOfProducts),
      error: (err: HttpErrorResponse) =>
        this.snackbarConfigService.showError(err),
    });
  }

  private createProductProducer(): void {
    this.productProducerService
      .createProductProducer(this.productProducerForm.value)
      .subscribe({
        next: (productProducer: IProductProducer) => {
          this.productProducerItems.push(productProducer);
          this.productProducerForm.reset();
        },
        error: (err: HttpErrorResponse) =>
          this.snackbarConfigService.showError(err),
      });
  }

  private updateProductProducer(): void {
    this.productProducerService
      .updateProductProducer(this.productProducerForm.value)
      .subscribe({
        next: ({ name, typeOfProduct, id }: IProductProducer) =>
          (this.productProducerItems = this.productProducerItems.map((el) =>
            el.id === id ? { ...el, name, typeOfProduct, id } : el
          )),
        error: (err: HttpErrorResponse) =>
          this.snackbarConfigService.showError(err),
      });
  }
}
