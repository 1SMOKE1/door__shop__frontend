import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpProductProducerService } from '@share-services/http-product-producer.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { ValidationService } from '@share-services/validation.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { IProductProducer } from '@modules/share/interfaces/common/product-producer.interface';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { ProductProducersComponent } from '../product-producers/product-producers.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { CountryEnum } from '@modules/share/enums/country.enum';
import { GuaranteeEnum } from '@modules/share/enums/guarantee.enum';
import { InStockEnum } from '@modules/share/enums/in-stock.enum';
import { IFurniture } from '@modules/share/interfaces/common/furniture.interface';
import { FurnitureService } from '../../../services/products/furniture.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductClass } from '../../../utils/product.class';

@Component({
  selector: 'dsf-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent extends ProductClass implements OnInit{

  furnitureProducers: IProductProducer[] = [];
  countries: ITransformedEnum[] = [];
  guarantees: ITransformedEnum[] = [];
  inStocks: ITransformedEnum[] = [];

  imagesFileList: FileList | null = null;

  furnitureForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    productProducerName: new FormControl('', [Validators.required]),
    typeOfProductName: new FormControl(TypeOfProductEnum.furniture),
    name: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),
    country: new FormControl('', [Validators.required]),
    guarantee: new FormControl('', [Validators.required]),
    price: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern()),
    ]),
    inStock: new FormControl('', [Validators.required]),
    homePage: new FormControl(false),
    description: new FormControl('')
  })

  constructor(
    private readonly productProducerService: HttpProductProducerService,
    private readonly transformEnumService: TransformEnumService,
    private readonly validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: IFurniture | null,
    private readonly dialog: MatDialog,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly furnitureService: FurnitureService
  ){
    super();
  }

  ngOnInit(): void {
    this.initProductProducers();
    this.initCountries();
    this.initGuarantees();
    this.initInStocks();

    if(this.isEditMode() && this.data != null)
      this.furnitureForm.patchValue(this.data);
    
  }

  public submit(): void{
    if(this.isEditMode()) this.updateFurniture();
    else this.createFurniture();
  }

  public isEditMode(): boolean {
    return this.data !== null ? true : false;
  }

  public onImagesFolderSelected(e: Event): void {
    const cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  public addProductProducer(): void {
    const dialogRef = this.dialog.open(ProductProducersComponent);

    dialogRef.afterClosed()
    .subscribe((productProducer: IProductProducer | null) => {
      this.furnitureForm.get('productProducerName')?.patchValue(productProducer?.name);
      this.initProductProducers();
    })
  }

  private createFurniture(): void{
    this.furnitureService
      .createFurniture(this.furnitureForm.value, this.imagesFileList)
      .subscribe({
        next: ({ name, typeOfProductName }) => {
          this.furnitureForm.reset();
          this.furnitureForm.get('typeOfProductName')?.patchValue(typeOfProductName);
          this.snackbarConfigService.openSnackBar(`Фурнітура з ім'ям: ${name}, було успішно створено`);
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
  }

  private updateFurniture(): void{
    this.furnitureService
      .updateFurniture(this.furnitureForm.value, this.imagesFileList)
      .subscribe({
        next: (data: IFurniture) => {
          this.data = data;
          this.furnitureForm.patchValue(data);
          if(data.productProducerName === null)
            this.furnitureForm.get('productProducerName')?.patchValue(this.noProductProducer.name);
          this.snackbarConfigService.openSnackBar(`Фурнітура з ім'ям: ${data.name}, було успішно змінено`);
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      });
  }

  private initProductProducers() {
    this.productProducerService
      .getFurnitureProductProducers()
      .subscribe(
        (producers: IProductProducer[]) => {
          this.furnitureProducers = [this.noProductProducer, ...producers];
          if(!this.isEditMode() || producers.length === 0 || this.data?.productProducerName === null)
            this.furnitureForm.get('productProducerName')?.setValue(this.furnitureProducers[0].name);
        }
            
      );
  }

  private initCountries() {
    this.countries = this.transformEnumService.generateEnumArr(CountryEnum);
  }

  private initGuarantees() {
    this.guarantees = this.transformEnumService.generateEnumArr(GuaranteeEnum);
  }

  private initInStocks() {
    this.inStocks = this.transformEnumService.generateEnumArr(InStockEnum);
  }
}
