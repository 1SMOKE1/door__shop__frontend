import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
import { IFurniture } from 'src/app/modules/share/interfaces/common/furniture.interface';
import { CalculatorCharModel } from '../../../models/calculator-char.model';
import { WeightService } from '../../../services/product-constants/weight.service';
import { WeightComponent } from '../../product-constants/weight/weight.component';
import { FrameMaterialConstractionService } from '../../../services/product-constants/frame-material-constraction.service';
import { FrameMaterialConstractionComponent } from '../../product-constants/frame-material-constraction/frame-material-constraction.component';
import { SealerCircuitService } from '../../../services/product-constants/sealer-circuit.service';
import { SealerCircuitComponent } from '../../product-constants/sealer-circuit/sealer-circuit.component';

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
    metalThickness: new FormControl(0),
    frameMaterialConstuction: new FormControl([]),
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
    private readonly snackbar: MatSnackBar,
    private readonly snackbarConfigService: SnackbarConfigService,
  ){}

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
    return this.isEditMode() ? this.entranceDoorForm.get(fieldName)?.value.join('/') : [];
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
    .subscribe(() => this.initDoorInsulationItems());
  }

  public addDoorCovering(){
    const dialogRef = this.dialog.open(DoorCoveringComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initDoorCoveringItems());
  }

  public addOpeningType(){
    const dialogRef = this.dialog.open(OpeningTypeComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initDoorOpeningTypeItems());
  }

  public addDoorSize(){
    const dialogRef = this.dialog.open(SizeComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initDoorSizeItems());
  }

  public addDoorWeight(){
    const dialogRef = this.dialog.open(WeightComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initDoorWeightItems());
  }

  public addDoorFrameMaterialConstruction(){
    const dialogRef = this.dialog.open(FrameMaterialConstractionComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initDoorFrameMaterialConstructionItems());
  }

  public addDoorSealerCircuit(){
    const dialogRef = this.dialog.open(SealerCircuitComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.initDoorSealerCircuitItems());
  }

  public submit(){

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

  private initDoorInsulationItems(){
    this.doorInsulationService
    .getAllDoorInsulationItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorInsulationItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    });
  }

  private initDoorCoveringItems(){
    this.doorCoveringService
    .getAllDoorCoveringItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorCoveringItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    });
  }

  private initDoorOpeningTypeItems(){
    this.doorOpeningTypeService
    .getAllOpeningTypeItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorOpeningTypeItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private initDoorSizeItems(){
    this.doorSizeService
    .getAllDoorSizeItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorSizeItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private initFurnitureItems(){
    this.furnitureService.getAllFurniture().subscribe({
      next: (items: IFurniture[]) => {
        this.doorLowerLockItems = this.convertToCalculatorChar(items);
        this.doorUpperLockItems = this.convertToCalculatorChar(items);
        this.doorHandItems = this.convertToCalculatorChar(items);
      }, 
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private initDoorWeightItems(){
    this.doorWeightService
    .getAllDoorSizeItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorWeightItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private initDoorFrameMaterialConstructionItems(){
    this.doorFrameMaterialConstructionService
    .getAllOpeningTypeItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorFrameMaterialConstructionItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
    })
  }

  private initDoorSealerCircuitItems(){
    this.sealerCircuitService
    .getAllSealerCircuitItems()
    .subscribe({
      next: (items: ICalculatorChar[]) => (this.doorSealerCircuitItems = items),
      error: (err: Error) => this.snackbarConfigService.openSnackBar(err.message)
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
