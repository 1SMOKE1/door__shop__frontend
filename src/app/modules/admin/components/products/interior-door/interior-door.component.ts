import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductProducer } from 'src/app/modules/share/interfaces/common/product-producer.interface';
import { HttpProductProducerService } from 'src/app/modules/share/services/common/http-product-producer.service';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { CountryEnum } from 'src/app/modules/share/enums/country.enum';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { GuaranteeEnum } from 'src/app/modules/share/enums/guarantee.enum';
import { InStockEnum } from 'src/app/modules/share/enums/in-stock.enum';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FabricMaterialWidthComponent } from '../../product-constants/fabric-material-width/fabric-material-width.component';

import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FabricMaterialWidthService } from '../../../services/product-constants/fabric-material-width.service';
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
import { DoorIsolationService } from '../../../services/product-constants/door-isolation.service';
import { DoorIsolationComponent } from '../../product-constants/door-isolation/door-isolation.component';
import { DoorFrameMaterialService } from '../../../services/product-constants/door-frame-material.service';
import { DoorFrameMaterialComponent } from '../../product-constants/door-frame-material/door-frame-material.component';
import { DoorSelectionBoardService } from '../../../services/product-constants/door-selection-board.service';
import { DoorSelectionBoardComponent } from '../../product-constants/door-selection-board/door-selection-board.component';
import { DoorWeltService } from '../../../services/product-constants/door-welt.service';
import { DoorWeltComponent } from '../../product-constants/door-welt/door-welt.component';
import { DoorSlidingSystemService } from '../../../services/product-constants/door-sliding-system.service';
import { DoorSlidingSystemComponent } from '../../product-constants/door-sliding-system/door-sliding-system.component';
import { FurnitureService } from '../../../services/products/furniture.service';
import { IFurniture } from 'src/app/modules/share/interfaces/common/furniture.interface';
import { CalculatorCharModel } from '../../../models/calculator-char.model';
import { InteriorDoorService } from '../../../services/products/interior-door.service';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { IInteriorDoor } from 'src/app/modules/share/interfaces/common/interior-door.interface';
import { ProductProducersComponent } from '../product-producers/product-producers.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dsf-interior-door',
  templateUrl: './interior-door.component.html',
  styleUrls: ['./interior-door.component.scss'],
})
export class InteriorDoorComponent implements OnInit {
  interiorDoorProducers: IProductProducer[] = [];
  countries: ITransformedEnum[] = [];
  guarantees: ITransformedEnum[] = [];
  inStocks: ITransformedEnum[] = [];

  fabricMaterialWidthItems: ICalculatorChar[] = [];
  doorIsolationItems: ICalculatorChar[] = [];
  doorFrameMaterialItems: ICalculatorChar[] = [];
  doorSelectionBoardItems: ICalculatorChar[] = [];
  doorWeltItems: ICalculatorChar[] = [];
  doorSlidingSystemItems: ICalculatorChar[] = [];

  doorHandItems: ICalculatorChar[] = [];
  doorMechanismItems: ICalculatorChar[] = [];
  doorLoopsItems: ICalculatorChar[] = [];
  doorStopperItems: ICalculatorChar[] = [];

  imagesFileList: FileList | null = null;

  interiorDoorForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    productProducerName: new FormControl('', [Validators.required]),
    typeOfProductName: new FormControl(TypeOfProductEnum.interiorDoor),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', [Validators.required]),
    guarantee: new FormControl('', [Validators.required]),
    price: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern()),
    ]),
    inStock: new FormControl('', [Validators.required]),
    fabricMaterialThickness: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern()),
    ]),
    fabricMaterialHeight: new FormControl(0, [
      Validators.required,
      Validators.pattern(this.validationService.positiveNumberPattern()),
    ]),
    fabricMaterialWidth: new FormControl([]),
    doorIsolation: new FormControl([]),
    doorFrameMaterial: new FormControl([]),
    doorSelectionBoard: new FormControl([]),
    doorWelt: new FormControl([]),
    doorSlidingSystem: new FormControl([]),
    doorHand: new FormControl([]),
    doorMechanism: new FormControl([]),
    doorLoops: new FormControl([]),
    doorStopper: new FormControl([]),
    homePage: new FormControl(false),
    description: new FormControl(''),
  });

  constructor(
    private readonly productProducerService: HttpProductProducerService,
    private readonly validationService: ValidationService,
    private readonly transformEnumService: TransformEnumService,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IInteriorDoor | null,
    private readonly snackbarConfigService: SnackbarConfigService,

    private readonly fabricMaterialWidthService: FabricMaterialWidthService,
    private readonly doorIsolationService: DoorIsolationService,
    private readonly doorFrameMaterialService: DoorFrameMaterialService,
    private readonly doorSelectionBoardService: DoorSelectionBoardService,
    private readonly doorWeltService: DoorWeltService,
    private readonly doorSlidingSystemService: DoorSlidingSystemService,
    private readonly funritureService: FurnitureService,
    private readonly interiorDoorService: InteriorDoorService
  ) {}

  ngOnInit(): void {
    this.initProductProducers();
    this.initCountries();
    this.initGuarantees();
    this.initInStocks();

    this.initFabricMaterialWidthItems();
    this.initDoorIsolationItems();
    this.initDoorFrameMaterialItems();
    this.initDoorSelectionBoardItems();
    this.initDoorWeltItems();
    this.initDoorSlidingSystemItems();
    this.initFurnitureItems();

    if (this.isEditMode() && this.data != null){
      this.interiorDoorForm.patchValue(this.data);
      this.initSlashStylingOfFormFields();
    }

    
      
      
    
      
      
  }

  public slashStylingOfFormField(fieldName: string): string | [] {
    return this.isEditMode() ? this.interiorDoorForm.get(fieldName)?.value.join('/') : [];
  }

  public addProductProducer(): void {
    const dialogRef = this.dialog.open(ProductProducersComponent);

    dialogRef.afterClosed()
    .subscribe((productProducer: IProductProducer | null) => {
      this.interiorDoorForm.get('productProducerName')?.patchValue(productProducer?.name);
      this.initProductProducers();
    })
  }

  public addFabricMaterialWidth(): void {
    const dialogRef = this.dialog.open(FabricMaterialWidthComponent);

    dialogRef
      .afterClosed()
      .subscribe(() => this.initFabricMaterialWidthItems());
  }

  public addDoorIsolation() {
    const dialogRef = this.dialog.open(DoorIsolationComponent);

    dialogRef.afterClosed().subscribe(() => this.initDoorIsolationItems());
  }

  public addDoorFrameMaterial() {
    const dialogRef = this.dialog.open(DoorFrameMaterialComponent);

    dialogRef.afterClosed().subscribe(() => this.initDoorFrameMaterialItems());
  }

  public addDoorSelectionBoard() {
    const dialogRef = this.dialog.open(DoorSelectionBoardComponent);

    dialogRef.afterClosed().subscribe(() => this.initDoorSelectionBoardItems());
  }

  public addDoorWelt() {
    const dialogRef = this.dialog.open(DoorWeltComponent);

    dialogRef.afterClosed().subscribe(() => this.initDoorWeltItems());
  }

  public addDoorSlidingSystem() {
    const dialogRef = this.dialog.open(DoorSlidingSystemComponent);

    dialogRef.afterClosed().subscribe(() => this.initDoorSlidingSystemItems());
  }

  public isEditMode(): boolean {
    return this.data !== null ? true : false;
  }

  public onImagesFolderSelected(e: Event): void {
    let cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  public submit() {
    if (this.isEditMode()) 
      this.updateInteriorDoor();
    else 
      this.createInteriorDoor();
  }

  private createInteriorDoor(): void {
    this.interiorDoorService
      .createInteriorDoor(this.interiorDoorForm.value, this.imagesFileList)
      .subscribe({
        next: ({ name, typeOfProductName }) => {
          this.interiorDoorForm.reset();
          this.interiorDoorForm.get('typeOfProductName')?.patchValue(typeOfProductName);
          this.snackbarConfigService.openSnackBar(`Двері міжкімнатні з ім'ям: ${name}, було успішно створено`);
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      });
  }

  private updateInteriorDoor(): void {
    this.interiorDoorService
      .updateInteriorDoor(this.interiorDoorForm.value, this.imagesFileList)
      .subscribe({
        next: (data: IInteriorDoor) => {
          this.data = data;
          this.interiorDoorForm.patchValue(data);
          this.initSlashStylingOfFormFields();
          this.snackbarConfigService.openSnackBar(`Двері міжкімнатні з ім'ям: ${data.name}, було успішно змінено`);
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      });
  }

  private initProductProducers() {
    this.productProducerService
      .getInteriorDoorProductProducers()
      .subscribe(
        (producers: IProductProducer[]) =>
          (this.interiorDoorProducers = producers)
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

  private initFabricMaterialWidthItems() {
    this.fabricMaterialWidthService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) =>
        (this.fabricMaterialWidthItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorIsolationItems() {
    this.doorIsolationService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.doorIsolationItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorFrameMaterialItems() {
    this.doorFrameMaterialService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.doorFrameMaterialItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorSelectionBoardItems() {
    this.doorSelectionBoardService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => {
        this.doorSelectionBoardItems = items;
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorWeltItems() {
    this.doorWeltService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.doorWeltItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initDoorSlidingSystemItems() {
    this.doorSlidingSystemService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) => (this.doorSlidingSystemItems = items),
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private initFurnitureItems() {
    this.funritureService.getAllFurniture().subscribe({
      next: (items: IFurniture[]) => {
        this.doorHandItems = this.convertToCalculatorChar(items);
        this.doorMechanismItems = this.convertToCalculatorChar(items);
        this.doorLoopsItems = this.convertToCalculatorChar(items);
        this.doorStopperItems = this.convertToCalculatorChar(items);
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    });
  }

  private convertToCalculatorChar(data: IFurniture[]): ICalculatorChar[] {
    return data.map(
      ({ name, price, id }: IFurniture): ICalculatorChar =>
        new CalculatorCharModel(name, price, id)
    );
  }

  private initSlashStylingOfFormFields(){
    this.interiorDoorForm.get('fabricMaterialWidth')?.setValue(this.data?.fabricMaterialWidth.map((el) => el.name))
    this.interiorDoorForm.get('doorIsolation')?.setValue(this.data?.doorIsolation.map((el) => el.name))
    this.interiorDoorForm.get('doorFrameMaterial')?.setValue(this.data?.doorFrameMaterial.map((el) => el.name))
    this.interiorDoorForm.get('doorSelectionBoard')?.setValue(this.data?.doorSelectionBoard.map((el) => el.name))
    this.interiorDoorForm.get('doorWelt')?.setValue(this.data?.doorWelt.map((el) => el.name))
    this.interiorDoorForm.get('doorHand')?.setValue(this.data?.doorHand.map((el) => el.name));
    this.interiorDoorForm.get('doorMechanism')?.setValue(this.data?.doorMechanism.map((el) => el.name));
    this.interiorDoorForm.get('doorLoops')?.setValue(this.data?.doorLoops.map((el) => el.name));
    this.interiorDoorForm.get('doorStopper')?.setValue(this.data?.doorStopper.map((el) => el.name))
    this.interiorDoorForm.get('doorSlidingSystem')?.setValue(this.data?.doorSlidingSystem.map((el) => el.name))
  }


}
