import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductProducer } from 'src/app/modules/share/interfaces/common/product-producer.interface';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IWindow } from 'src/app/modules/share/interfaces/common/window.interface';
import { IFurniture } from 'src/app/modules/share/interfaces/common/furniture.interface';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { CalculatorCharModel } from '../../../models/calculator-char.model';
import { HttpProductProducerService } from 'src/app/modules/share/services/common/http-product-producer.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { CountryEnum } from 'src/app/modules/share/enums/country.enum';
import { GuaranteeEnum } from 'src/app/modules/share/enums/guarantee.enum';
import { InStockEnum } from 'src/app/modules/share/enums/in-stock.enum';
import { ProductProducersComponent } from '../product-producers/product-producers.component';

@Component({
  selector: 'dsf-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit{

  windowProducers: IProductProducer[] = [];
  countries: ITransformedEnum[] = [];
  guarantees: ITransformedEnum[] = [];
  inStocks: ITransformedEnum[] = [];

  imagesFileList: FileList | null = null;

  windowForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    productProducerName: new FormControl('', [Validators.required]),
    typeOfProductName: new FormControl(TypeOfProductEnum.windows),
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
    mosquitoNet: new FormControl([]),
    windowSill: new FormControl([]),
    windowEbb: new FormControl([]),
    windowHand: new FormControl([]),
    childLock: new FormControl([]),
    housewifeStub: new FormControl([]),
    glassPocketAdd: new FormControl([]),
    lamination: new FormControl([]),
    profile: new FormControl([]),
    windowHeight: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern()),
    ]),
    windowWidth: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern()),
    ]),
    camerasCount: new FormControl([]),
    features: new FormControl([]),
    sectionCount: new FormControl([]),
    homePage: new FormControl(false),
    description: new FormControl('')
  }
    
  )

  constructor(
    private readonly productProducerService: HttpProductProducerService,
    private readonly transformEnumService: TransformEnumService,
    private readonly validationService: ValidationService,
    @Inject(MAT_DIALOG_DATA) public data: IWindow | null,
    private readonly dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.initProductProducers();
    this.initCountries();
    this.initGuarantees();
    this.initInStocks();


    this.initSlashStylingOfFormFields();
  }

  public isEditMode(): boolean {
    return this.data !== null ? true : false;
  }

  public submit(){

  }

  public onImagesFolderSelected(e: Event): void {
    let cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  private convertToCalculatorChar(data: IFurniture[]): ICalculatorChar[] {
    return data.map(
      ({ name, price, id }: IFurniture): ICalculatorChar =>
        new CalculatorCharModel(name, price, id)
    );
  }

  public addProductProducer(): void {
    const dialogRef = this.dialog.open(ProductProducersComponent);

    dialogRef.afterClosed()
    .subscribe((productProducer: IProductProducer | null) => {
      this.windowForm.get('productProducerName')?.patchValue(productProducer?.name);
      this.initProductProducers();
    })
  }

  private initProductProducers() {
    this.productProducerService
      .getWindowProductProducers()
      .subscribe(
        (producers: IProductProducer[]) =>
          (this.windowProducers = producers)
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

  private initSlashStylingOfFormFields(){
    this.windowForm.get('mosquitoNet')?.setValue(this.data?.mosquitNet?.map((el) => el.name));
    this.windowForm.get('windowSill')?.setValue(this.data?.windowSill?.map((el) => el.name));
    this.windowForm.get('windowEbb')?.setValue(this.data?.windowEbb.map((el) => el.name));
    this.windowForm.get('windowHand')?.setValue(this.data?.windowHand.map((el) => el.name));
    this.windowForm.get('childLock')?.setValue(this.data?.childLock.map((el) => el.name));
    this.windowForm.get('housewifeStub')?.setValue(this.data?.housewifeStub.map((el) => el.name));
    this.windowForm.get('glassPocketAdd')?.setValue(this.data?.glassPocketAdd.map((el) => el.name));
    this.windowForm.get('lamination')?.setValue(this.data?.lamination.map((el) => el.name));
    this.windowForm.get('profile')?.setValue(this.data?.profile.map((el) => el.name)); 
    this.windowForm.get('camerasCount')?.setValue(this.data?.camerasCount.map((el) => el.name));
    this.windowForm.get('features')?.setValue(this.data?.features.map((el) => el.name));
    this.windowForm.get('sectionCount')?.setValue(this.data?.sectionsCount.map((el) => el.name));
  }

}
