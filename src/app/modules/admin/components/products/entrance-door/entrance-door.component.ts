import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { IEntranceDoor } from 'src/app/modules/share/interfaces/common/entrance-door.interface';
import { HttpProductProducerService } from 'src/app/modules/share/services/common/http-product-producer.service';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { IProductProducer } from 'src/app/modules/share/interfaces/common/product-producer.interface';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { CountryEnum } from 'src/app/modules/share/enums/country.enum';
import { GuaranteeEnum } from 'src/app/modules/share/enums/guarantee.enum';
import { InStockEnum } from 'src/app/modules/share/enums/in-stock.enum';

@Component({
  selector: 'dsf-entrance-door',
  templateUrl: './entrance-door.component.html',
  styleUrls: ['./entrance-door.component.scss']
})
export class EntranceDoorComponent implements OnInit{

  entranceDoorProducers: IProductProducer[] = [];
  countries: ITransformedEnum[] = [];
  guarantees: ITransformedEnum[] = [];
  inStocks: ITransformedEnum[] = [];

  entranceDoorForm: FormGroup = new FormGroup({
    id: new FormGroup(0),
    productProducerName: new FormControl('', [Validators.required]),
    typeOfProductName: new FormControl(TypeOfProductEnum.entranceDoor),
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    guarantee: new FormControl('', [Validators.required]),
    price: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    inStock: new FormControl('', [Validators.required]),
    fabricMaterialThickness: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]), 
    frameMaterialThickness: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    doorInsulation: new FormControl([]),
    covering: new FormControl([]),
    doorPeephole: new FormControl(false),
    openingType: new FormControl([]),
    size: new FormControl([]),
    lowerLock: new FormControl([]),
    upperLock: new FormControl([]),
    weight: new FormControl([]),
    metalThickness: new FormControl([]),
    frameMaterialConstuction: new FormControl([]),
    sealerCircuit: new FormControl([])
  })

  imagesFileList: FileList | null = null;

  constructor(
    private readonly productProducerService: HttpProductProducerService,
    private readonly validationService: ValidationService,
    private readonly transformEnumService: TransformEnumService,
    @Inject(MAT_DIALOG_DATA) public data: IEntranceDoor | null,
    private readonly snackbar: MatSnackBar,
    private readonly snackbarConfigService: SnackbarConfigService,
  ){}

  ngOnInit(): void {
    this.initProductProducers();
    this.initCountries();
    this.initGuarantees();
    this.initInStocks();

    if (this.isEditMode() && this.data != null)
      this.entranceDoorForm.patchValue(this.data);
  }

  public slashStylingOfFormField(fieldName: string): string | [] {
    return this.isEditMode() ? this.entranceDoorForm.get(fieldName)?.value.join('/') : [];
  }

  public isEditMode(): boolean{
    return this.data !== null ? true : false;
  } 

  public onImagesFolderSelected(e: Event): void {
    let cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  private initProductProducers() {
    this.productProducerService
      .getEntranceDoorProductProducers()
      .subscribe(
        (producers: IProductProducer[]) =>
          (this.entranceDoorProducers = producers)
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
