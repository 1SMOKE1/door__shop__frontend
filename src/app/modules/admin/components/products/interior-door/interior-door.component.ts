import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductProducer } from '@modules/share/interfaces/common/product-producer.interface';
import { HttpProductProducerService } from '@share-services/http-product-producer.service';
import { ValidationService } from '@share-services/validation.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { CountryEnum } from '@modules/share/enums/country.enum';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { GuaranteeEnum } from '@modules/share/enums/guarantee.enum';
import { InStockEnum } from '@modules/share/enums/in-stock.enum';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FabricMaterialWidthComponent } from '../../product-constants/fabric-material-width/fabric-material-width.component';

import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { FabricMaterialWidthService } from '../../../services/product-constants/fabric-material-width.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
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
import { IFurniture } from '@modules/share/interfaces/common/furniture.interface';
import { CalculatorCharModel } from '../../../models/calculator-char.model';
import { InteriorDoorService } from '../../../services/products/interior-door.service';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { IInteriorDoor } from '@modules/share/interfaces/common/interior-door.interface';
import { ProductProducersComponent } from '../product-producers/product-producers.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductClass } from '../../../utils/product.class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsService } from '@modules/admin/services/products.service';


@Component({
  selector: 'dsf-interior-door',
  templateUrl: './interior-door.component.html',
  styleUrls: ['./interior-door.component.scss'],
})
export class InteriorDoorComponent extends ProductClass implements OnInit {

  @ViewChild('fileInput') public fileInputRef: ElementRef;

  slashStylingOfFormFieldObj: any = {
    fabricMaterialWidth: [],
    doorIsolation: [],
    doorFrameMaterial: [],
    doorSelectionBoard: [],
    doorWelt: [],
    doorSlidingSystem: [],
    doorHand: [],
    doorMechanism: [],
    doorLoops: [],
    doorStopper: [],
  };

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

  imagesFiles: File[] = [];
  imagesFilesPreview: string[] = [];

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
    private readonly interiorDoorService: InteriorDoorService,
    private readonly productsService: ProductsService
  ) {
    super();
  }

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
      this.imagesForUpdateProductPreview();
    }
      
  }

  public slashStylingOfFormField(fieldName: string): string | [] {
    this.interiorDoorForm.get(fieldName)?.valueChanges.subscribe((value: string[]) => {
      this.slashStylingOfFormFieldObj = {...this.slashStylingOfFormFieldObj, [`${fieldName}`]: value};
    })
    return this.isEditMode() ? this.slashStylingOfFormFieldObj[`${fieldName}`].join('/') : [];
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
      .subscribe((data: ICalculatorChar[]) => {
        this.fabricMaterialWidthItems = data;
        this.interiorDoorForm.get('fabricMaterialWidth')?.setValue(data.map((el) => el.name));
      });
  }

  public addDoorIsolation() {
    const dialogRef = this.dialog.open(DoorIsolationComponent);

    dialogRef
      .afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.doorIsolationItems = data;
        this.interiorDoorForm.get('doorIsolation')?.setValue(data.map((el) => el.name));
      });
  }

  public addDoorFrameMaterial() {
    const dialogRef = this.dialog.open(DoorFrameMaterialComponent);

    dialogRef
      .afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.doorFrameMaterialItems = data;
        this.interiorDoorForm.get('doorFrameMaterial')?.setValue(data.map((el) => el.name));
      });
  }

  public addDoorSelectionBoard() {
    const dialogRef = this.dialog.open(DoorSelectionBoardComponent);

    dialogRef
      .afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.doorSelectionBoardItems = data;
        this.interiorDoorForm.get('doorSelectionBoard')?.setValue(data.map((el) => el.name));
      });
  }

  public addDoorWelt() {
    const dialogRef = this.dialog.open(DoorWeltComponent);

    dialogRef
      .afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.doorWeltItems = data;
        this.interiorDoorForm.get('doorWelt')?.setValue(data.map((el) => el.name));
      });
  }

  public addDoorSlidingSystem() {
    const dialogRef = this.dialog.open(DoorSlidingSystemComponent);

    dialogRef
      .afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.doorSlidingSystemItems = data;
        this.interiorDoorForm.get('doorSlidingSystem')?.setValue(data.map((el) => el.name));
      });
  }

  public isEditMode(): boolean {
    return this.data !== null ? true : false;
  }

  public onImagesFolderSelected(e: Event): void {
    this.imagesFiles = [];
    this.imagesFilesPreview = [];
    let cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFiles = [...cur.files];

    if(this.productsService.checkImagesOnCorrectName(this.imagesFiles)){
      this.imagesFiles = [];
      this.imagesFilesPreview = [];
      this.fileInputRef.nativeElement.value = null;
      return
    }

    if (this.imagesFiles) {
      const numberOfFiles = this.imagesFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.imagesFilesPreview.push(e.target.result);
        };
  
        reader.readAsDataURL(this.imagesFiles[i]);
      }
    }
  }

  public submit() {
    if (this.isEditMode()) 
      this.updateInteriorDoor();
    else 
      this.createInteriorDoor();
  }

  public drop(event: CdkDragDrop<File[]>){
    moveItemInArray(this.imagesFiles, event.previousIndex, event.currentIndex);
    moveItemInArray(this.imagesFilesPreview, event.previousIndex, event.currentIndex);
  }

  private createInteriorDoor(): void {
    this.interiorDoorService
      .createInteriorDoor(this.interiorDoorForm.value, this.imagesFiles)
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
      .updateInteriorDoor(this.interiorDoorForm.value, this.imagesFiles)
      .subscribe({
        next: (data: IInteriorDoor) => {
          this.data = data;
          this.interiorDoorForm.patchValue(data);
          if(data.productProducerName === null)
            this.interiorDoorForm.get('productProducerName')?.patchValue(this.noProductProducer.name);
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
        (producers: IProductProducer[]) => {
          this.interiorDoorProducers = [this.noProductProducer, ...producers];
          if(!this.isEditMode() || producers.length === 0 || this.data?.productProducerName === null)
            this.interiorDoorForm.get('productProducerName')?.setValue(this.interiorDoorProducers[0].name);
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


  private imagesForUpdateProductPreview(): void{
    const prodImages = this.data?.images?.filter((image) => image !== 'assets/no_image.jpg');
    if(prodImages)
    prodImages.forEach((image) => {
      this.interiorDoorService
      .getFiles(image)
        .then((blob: Blob) => {
          const imageName = image.split('-')[2];

          const file = new File([blob], imageName, { type: blob.type })
          this.imagesFiles.push(file)
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.imagesFilesPreview.push(e.target.result);
          };
    
          reader.readAsDataURL(file);
        })
    })
  }


}
