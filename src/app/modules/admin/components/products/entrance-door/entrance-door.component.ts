import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { IEntranceDoor } from '@modules/share/interfaces/common/entrance-door.interface';
import { HttpProductProducerService } from '@share-services/http-product-producer.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { ValidationService } from '@share-services/validation.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { IProductProducer } from '@modules/share/interfaces/common/product-producer.interface';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { CountryEnum } from '@modules/share/enums/country.enum';
import { GuaranteeEnum } from '@modules/share/enums/guarantee.enum';
import { InStockEnum } from '@modules/share/enums/in-stock.enum';
import { DoorInsulationComponent } from '../../product-constants/door-insulation/door-insulation.component';
import { DoorInsulationService } from '../../../services/product-constants/door-insulation.service';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { DoorCoveringService } from '../../../services/product-constants/door-covering.service';
import { DoorCoveringComponent } from '../../product-constants/door-covering/door-covering.component';
import { OpeningTypeComponent } from '../../product-constants/opening-type/opening-type.component';
import { OpeningTypeService } from '../../../services/product-constants/opening-type.service';
import { SizeComponent } from '../../product-constants/size/size.component';
import { SizeService } from '../../../services/product-constants/size.service';
import { FurnitureService } from '../../../services/products/furniture.service';
import { IFurniture } from '@modules/share/interfaces/common/furniture.interface';
import { CalculatorCharModel } from '../../../models/calculator-char.model';
import { WeightService } from '../../../services/product-constants/weight.service';
import { WeightComponent } from '../../product-constants/weight/weight.component';
import { FrameMaterialConstractionService } from '../../../services/product-constants/frame-material-constraction.service';
import { FrameMaterialConstractionComponent } from '../../product-constants/frame-material-constraction/frame-material-constraction.component';
import { SealerCircuitService } from '../../../services/product-constants/sealer-circuit.service';
import { SealerCircuitComponent } from '../../product-constants/sealer-circuit/sealer-circuit.component';
import { EntranceDoorService } from '../../../services/products/entrance-door.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductProducersComponent } from '../product-producers/product-producers.component';
import { ProductClass } from '../../../utils/product.class';

@Component({
  selector: 'dsf-entrance-door',
  templateUrl: './entrance-door.component.html',
  styleUrls: ['./entrance-door.component.scss']
})
export class EntranceDoorComponent extends ProductClass implements OnInit{

  slashStylingOfFormFieldObj: any  = {
    doorInsulation: [],
    covering: [],
    openingType: [],
    size: [],
    lowerLock: [],
    upperLock: [],
    weight: [],
    frameMaterialConstruction: [],
    sealerCircuit: [],
    doorHand: [],
  }

  entranceDoorProducers: IProductProducer[] = [];
  countries: ITransformedEnum[] = [];
  guarantees: ITransformedEnum[] = [];
  inStocks: ITransformedEnum[] = [];

  doorInsulationItems: ICalculatorChar[] = [];
  doorCoveringItems: ICalculatorChar[] = [];
  doorOpeningTypeItems: ICalculatorChar[] = [];
  doorSizeItems: ICalculatorChar[] = [];
  doorLowerLockItems: ICalculatorChar[] = [];
  doorUpperLockItems: ICalculatorChar[] = [];
  doorWeightItems: ICalculatorChar[] = [];
  doorFrameMaterialConstructionItems: ICalculatorChar[] = [];
  doorSealerCircuitItems: ICalculatorChar[] = [];
  doorHandItems: ICalculatorChar[] = [];

  entranceDoorForm: FormGroup = new FormGroup({
    id: new FormControl(0),
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
    metalThickness: new FormControl(0, [
      Validators.pattern(this.validationService.positiveNumberPattern())
    ]),
    frameMaterialConstruction: new FormControl([]),
    sealerCircuit: new FormControl([]),
    doorHand: new FormControl([]),
    homePage: new FormControl(false),
    description: new FormControl(''),
  })

  imagesFileList: FileList | null = null;

  constructor(
    private readonly productProducerService: HttpProductProducerService,
    private readonly validationService: ValidationService,
    private readonly transformEnumService: TransformEnumService,
    private readonly dialog: MatDialog,
    private readonly doorInsulationService: DoorInsulationService,
    private readonly doorCoveringService: DoorCoveringService,
    private readonly doorOpeningTypeService: OpeningTypeService,
    private readonly doorSizeService: SizeService,
    private readonly furnitureService: FurnitureService,
    private readonly doorWeightService: WeightService,
    private readonly doorFrameMaterialConstructionService: FrameMaterialConstractionService,
    private readonly sealerCircuitService: SealerCircuitService,
    @Inject(MAT_DIALOG_DATA) public data: IEntranceDoor | null,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly entranceDoorService: EntranceDoorService,
  ){
    super();
  }

  ngOnInit(): void {
    this.initProductProducers();
    this.initCountries();
    this.initGuarantees();
    this.initInStocks();

    this.initDoorInsulationItems();
    this.initDoorCoveringItems();
    this.initDoorOpeningTypeItems();
    this.initDoorSizeItems();
    this.initFurnitureItems();
    this.initDoorWeightItems();
    this.initDoorFrameMaterialConstructionItems();
    this.initDoorSealerCircuitItems();
  



    if (this.isEditMode() && this.data != null){
      this.entranceDoorForm.patchValue(this.data);
      this.initSlashStylingOfFormFields();
    }
  }

  public slashStylingOfFormField(fieldName: string): string | [] {
    this.entranceDoorForm.get(fieldName)?.valueChanges.subscribe((value: string[]) => {
      this.slashStylingOfFormFieldObj = {...this.slashStylingOfFormFieldObj, [`${fieldName}`]: value};
    })
    return this.isEditMode() ? this.slashStylingOfFormFieldObj[`${fieldName}`].join('/') : [];
  }

  public isEditMode(): boolean{
    return this.data !== null ? true : false;
  } 

  public onImagesFolderSelected(e: Event): void {
    let cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  public addDoorInsulation(){
    const dialogRef = this.dialog.open(DoorInsulationComponent);

    dialogRef.afterClosed()
    .subscribe((data: ICalculatorChar[]) => {
      this.doorInsulationItems = data;
      this.entranceDoorForm.get('doorInsulation')?.setValue(data.map((el) => el.name))
    });
  }

  public addDoorCovering(){
    const dialogRef = this.dialog.open(DoorCoveringComponent);

    dialogRef.afterClosed()
    .subscribe((data: ICalculatorChar[]) => {
      this.doorCoveringItems = data;
      this.entranceDoorForm.get('covering')?.setValue(data.map((el) => el.name));
    });
  }

  public addOpeningType(){
    const dialogRef = this.dialog.open(OpeningTypeComponent);

    dialogRef.afterClosed()
    .subscribe((data: ICalculatorChar[]) => {
      this.doorOpeningTypeItems = data;
      this.entranceDoorForm.get('openingType')?.setValue(data.map((el) => el.name));
    });
  }

  public addDoorSize(){
    const dialogRef = this.dialog.open(SizeComponent);

    dialogRef.afterClosed()
    .subscribe((data: ICalculatorChar[]) => {
      this.doorSizeItems = data;
      this.entranceDoorForm.get('size')?.setValue(data.map((el) => el.name));
    });
  }

  public addDoorWeight(){
    const dialogRef = this.dialog.open(WeightComponent);

    dialogRef.afterClosed()
    .subscribe((data: ICalculatorChar[]) => {
      this.doorWeightItems = data;
      this.entranceDoorForm.get('weight')?.setValue(data.map((el) => el.name));
    });
  }

  public addDoorFrameMaterialConstruction(){
    const dialogRef = this.dialog.open(FrameMaterialConstractionComponent);

    dialogRef.afterClosed()
    .subscribe((data: ICalculatorChar[]) => {
      this.doorFrameMaterialConstructionItems = data;
      this.entranceDoorForm.get('frameMaterialConstruction')?.setValue(data.map((el) => el.name));
    });
  }

  public addDoorSealerCircuit(){
    const dialogRef = this.dialog.open(SealerCircuitComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.doorSealerCircuitItems = data;
        this.entranceDoorForm.get('sealerCircuit')?.setValue(data.map((el) => el.name));
      });
  }

  public addProductProducer(): void {
    const dialogRef = this.dialog.open(ProductProducersComponent);

    dialogRef.afterClosed()
    .subscribe((productProducer: IProductProducer | null) => {
      this.entranceDoorForm.get('productProducerName')?.patchValue(productProducer?.name);
      this.initProductProducers();
    })
  }

  public submit(){
    if(this.isEditMode())
      this.updateEntranceDoor();
    else
      this.createEntranceDoor();
  }

  private createEntranceDoor(): void {
    this.entranceDoorService
      .createEntranceDoor(this.entranceDoorForm.value, this.imagesFileList)
      .subscribe({
        next: ({name, typeOfProductName}) => {
          this.entranceDoorForm.reset();
          this.entranceDoorForm.get('typeOfProductName')?.patchValue(typeOfProductName);
          this.snackbarConfigService.openSnackBar(`Двері вхідні з ім'ям: ${name}, було успішно створено`);
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
  }

  private updateEntranceDoor(): void{
    this.entranceDoorService
      .updateEntranceDoor(this.entranceDoorForm.value, this.imagesFileList)
      .subscribe({
        next: (data: IEntranceDoor) => {
          this.data = data;
          this.entranceDoorForm.patchValue(data);
          if(data.productProducerName === null)
            this.entranceDoorForm.get('productProducerName')?.patchValue(this.noProductProducer.name);
          this.initSlashStylingOfFormFields();
          this.snackbarConfigService.openSnackBar(`Двері вхідні з ім'ям: ${data.name}, було успішно змінено`)
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
  }
  

  private initProductProducers(): void {
    this.productProducerService
      .getEntranceDoorProductProducers()
      .subscribe(
        (producers: IProductProducer[]) => {
          this.entranceDoorProducers = [this.noProductProducer, ...producers];
          if(!this.isEditMode() || producers.length === 0 || this.data?.productProducerName === null)
            this.entranceDoorForm.get('productProducerName')?.setValue(this.entranceDoorProducers[0].name);
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

  private initDoorInsulationItems(){
    this.doorInsulationService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorInsulationItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorCoveringItems(){
    this.doorCoveringService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorCoveringItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorOpeningTypeItems(){
    this.doorOpeningTypeService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorOpeningTypeItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initDoorSizeItems(){
    this.doorSizeService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorSizeItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initFurnitureItems(){
    this.furnitureService.getAllFurniture().subscribe({
      next: (items: IFurniture[]) => {
        this.doorLowerLockItems = this.convertToCalculatorChar(items);
        this.doorUpperLockItems = this.convertToCalculatorChar(items);
        this.doorHandItems = this.convertToCalculatorChar(items);
      }, 
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initDoorWeightItems(){
    this.doorWeightService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorWeightItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initDoorFrameMaterialConstructionItems(){
    this.doorFrameMaterialConstructionService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorFrameMaterialConstructionItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initDoorSealerCircuitItems(){
    this.sealerCircuitService
    .getAllItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorSealerCircuitItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private convertToCalculatorChar(data: IFurniture[]): ICalculatorChar[] {
    return data.map(
      ({ name, id }: IFurniture): ICalculatorChar =>
        new CalculatorCharModel(name, 0, id)
    );
  }

  private initSlashStylingOfFormFields(){
    this.entranceDoorForm.get('doorInsulation')?.setValue(this.data?.doorInsulation.map((el) => el.name));
    this.entranceDoorForm.get('covering')?.setValue(this.data?.covering.map((el) => el.name));
    this.entranceDoorForm.get('openingType')?.setValue(this.data?.openingType.map((el) => el.name));
    this.entranceDoorForm.get('size')?.setValue(this.data?.size.map((el) => el.name));
    this.entranceDoorForm.get('lowerLock')?.setValue(this.data?.lowerLock.map((el) => el.name));
    this.entranceDoorForm.get('upperLock')?.setValue(this.data?.upperLock.map((el) => el.name));
    this.entranceDoorForm.get('weight')?.setValue(this.data?.weight.map((el) => el.name));
    this.entranceDoorForm.get('frameMaterialConstruction')?.setValue(this.data?.frameMaterialConstruction.map((el) => el.name));
    this.entranceDoorForm.get('sealerCircuit')?.setValue(this.data?.sealerCircuit.map((el) => el.name));
    this.entranceDoorForm.get('doorHand')?.setValue(this.data?.doorHand.map((el) => el.name));
  }


}
