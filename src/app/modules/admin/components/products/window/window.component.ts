import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductProducer } from '@modules/share/interfaces/common/product-producer.interface';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { ValidationService } from '@share-services/validation.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IWindow } from '@modules/share/interfaces/common/window.interface';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { HttpProductProducerService } from '@share-services/http-product-producer.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { CountryEnum } from '@modules/share/enums/country.enum';
import { GuaranteeEnum } from '@modules/share/enums/guarantee.enum';
import { InStockEnum } from '@modules/share/enums/in-stock.enum';
import { ProductProducersComponent } from '../product-producers/product-producers.component';
import { MosquitoNetService } from '../../../services/product-constants/mosquito-net.service';
import { WindowSillService } from '../../../services/product-constants/window-sill.service';
import { WindowEbbService } from '../../../services/product-constants/window-ebb.service';
import { WindowHandService } from '../../../services/product-constants/window-hand.service';
import { ChildLockService } from '../../../services/product-constants/child-lock.service';
import { HousewifeStubService } from '../../../services/product-constants/housewife-stub.service';
import { GlassPocketAddService } from '../../../services/product-constants/glass-pocket-add.service';
import { LaminationService } from '../../../services/product-constants/lamination.service';
import { ProfileService } from '../../../services/product-constants/profile.service';
import { SnackbarConfigService } from '@share-services/snackbar-config.service';
import { CamerasCountService } from '../../../services/product-constants/cameras-count.service';
import { FeaturesService } from '../../../services/product-constants/features.service';
import { SectionCountService } from '../../../services/product-constants/section-count.service';
import { MosquitoNetComponent } from '../../product-constants/mosquito-net/mosquito-net.component';
import { HttpErrorResponse } from '@angular/common/http';
import { WindowSillComponent } from '../../product-constants/window-sill/window-sill.component';
import { WindowEbbComponent } from '../../product-constants/window-ebb/window-ebb.component';
import { WindowHandComponent } from '../../product-constants/window-hand/window-hand.component';
import { ChildLockComponent } from '../../product-constants/child-lock/child-lock.component';
import { HousewifeStubComponent } from '../../product-constants/housewife-stub/housewife-stub.component';
import { GlassPocketAddComponent } from '../../product-constants/glass-pocket-add/glass-pocket-add.component';
import { LaminationComponent } from '../../product-constants/lamination/lamination.component';
import { ProfileComponent } from '../../product-constants/profile/profile.component';
import { CamerasCountComponent } from '../../product-constants/cameras-count/cameras-count.component';
import { FeaturesComponent } from '../../product-constants/features/features.component';
import { SectionCountComponent } from '../../product-constants/section-count/section-count.component';
import { WindowService } from '../../../services/products/window.service';
import { ProductClass } from '../../../utils/product.class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsService } from '@modules/admin/services/products.service';

@Component({
  selector: 'dsf-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent extends ProductClass implements OnInit{

  @ViewChild('fileInput') public fileInputRef: ElementRef;

  slashStylingOfFormFieldObj: any = {
    mosquitoNet: [],
    windowSill: [],
    windowEbb: [],
    windowHand: [],
    childLock: [],
    housewifeStub: [],
    glassPocketAdd: [],
    lamination: [],
    profile: [],
    camerasCount: [],
    features: [],
    sectionCount: [],
  }

  windowProducers: IProductProducer[] = [];
  countries: ITransformedEnum[] = [];
  guarantees: ITransformedEnum[] = [];
  inStocks: ITransformedEnum[] = [];

  mosquitoNetItems: ICalculatorChar[] = [];
  windowSillItems: ICalculatorChar[] = [];
  windowEbbItems: ICalculatorChar[] = [];
  windowHandItems: ICalculatorChar[] = [];
  childLockItems: ICalculatorChar[] = [];
  housewifeStubItems: ICalculatorChar[] = [];
  glassPocketAddItems: ICalculatorChar[] = [];
  laminationItems: ICalculatorChar[] = [];
  profileItems: ICalculatorChar[] = [];
  camerasCountItems: ICalculatorChar[] = [];
  featuresItems: ICalculatorChar[] = [];
  sectionCountItems: ICalculatorChar[] = [];

  imagesFiles: File[] = [];
  imagesFilesPreview: string[] = [];

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
    private readonly snackbarConfigService: SnackbarConfigService,
    
    private readonly mosquitoNetService: MosquitoNetService,
    private readonly windowSillService: WindowSillService,
    private readonly windowEbbService: WindowEbbService,
    private readonly windowHandService: WindowHandService,
    private readonly childLockService: ChildLockService,
    private readonly housewifeStubService: HousewifeStubService,
    private readonly glassPocketAddService: GlassPocketAddService,
    private readonly laminationService: LaminationService,
    private readonly profileService: ProfileService,
    private readonly camerasCountService: CamerasCountService,
    private readonly featuresService: FeaturesService,
    private readonly sectionCountService: SectionCountService,
    private readonly windowService: WindowService,
    private readonly productsService: ProductsService
  ){
    super();
  }

  ngOnInit(): void {
    this.initProductProducers();
    this.initCountries();
    this.initGuarantees();
    this.initInStocks();

    this.initMosquitoNetItems();
    this.initWindowSillItems();
    this.initWindowEbbItems();
    this.initWindowHandItems();
    this.initChildLockItems();
    this.initHouseWifeItems();
    this.initGlassPocketAddItems();
    this.initLaminationItems();
    this.initProfileItems();
    this.initCamerasCountItems();
    this.initFeaturesItems();
    this.initSectionCountItems();
    

    if(this.isEditMode() && this.data != null){
      this.windowForm.patchValue(this.data);
      this.initSlashStylingOfFormFields();
      this.imagesForUpdateProductPreview();
    } 
    
  }

  public isEditMode(): boolean {
    return this.data !== null ? true : false;
  }

  public submit(): void{
    if(this.isEditMode())
      this.updateWindow();
    else 
      this.createWindow();
  }

  public drop(event: CdkDragDrop<File[]>){
    moveItemInArray(this.imagesFiles, event.previousIndex, event.currentIndex);
    moveItemInArray(this.imagesFilesPreview, event.previousIndex, event.currentIndex);
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
      return;
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

  public slashStylingOfFormField(fieldName: string): string | [] {
    this.windowForm.get(fieldName)?.valueChanges.subscribe((value: string[]) => {
      this.slashStylingOfFormFieldObj = {...this.slashStylingOfFormFieldObj, [`${fieldName}`]: value};
    })
    return this.isEditMode() ? this.slashStylingOfFormFieldObj[`${fieldName}`].join('/') : [];
  }

  public addProductProducer(): void {
    const dialogRef = this.dialog.open(ProductProducersComponent);

    dialogRef.afterClosed()
    .subscribe((productProducer: IProductProducer | null) => {
      this.windowForm.get('productProducerName')?.patchValue(productProducer?.name);
      this.initProductProducers();
    })
  }

  public addMosquitoNet(): void{
    const dialogRef = this.dialog.open(MosquitoNetComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.mosquitoNetItems = data;
        this.windowForm.get('mosquitoNet')?.setValue(data.map((el) => el.name));
      });
  }

  public addWindowSill(): void{
    const dialogRef = this.dialog.open(WindowSillComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.windowSillItems = data;
        this.windowForm.get('windowSill')?.setValue(data.map((el) => el.name));
      });
  }

  public addWindowEbb(): void{
    const dialogRef = this.dialog.open(WindowEbbComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.windowEbbItems = data;
        this.windowForm.get('windowEbb')?.setValue(data.map((el) => el.name));
      });
  }

  public addWindowHand(): void{
    const dialogRef = this.dialog.open(WindowHandComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.windowHandItems = data;
        this.windowForm.get('windowHand')?.setValue(data.map((el) => el.name));
      });
  }

  public addChildLock(): void{
    const dialogRef = this.dialog.open(ChildLockComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.childLockItems = data;
        this.windowForm.get('childLock')?.setValue(data.map((el) => el.name));
      });
  }

  public addHousewifeStub(): void{
    const dialogRef = this.dialog.open(HousewifeStubComponent);
    
    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.housewifeStubItems = data;
        this.windowForm.get('housewifeStub')?.setValue(data.map((el) => el.name));
      });
  }

  public addGlassPocketAdd(): void{
    const dialogRef = this.dialog.open(GlassPocketAddComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.glassPocketAddItems = data;
        this.windowForm.get('glassPocketAdd')?.setValue(data.map((el) => el.name));
      });
  }

  public addLamination(): void{
    const dialogRef = this.dialog.open(LaminationComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.laminationItems = data;
        this.windowForm.get('lamination')?.setValue(data.map((el) => el.name));
      });
  }

  public addProfile(): void{
    const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.profileItems = data;
        this.windowForm.get('profile')?.setValue(data.map((el) => el.name));
      });
  }

  public addCamerasCount(): void{
    const dialogRef = this.dialog.open(CamerasCountComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.camerasCountItems = data;
        this.windowForm.get('camerasCount')?.setValue(data.map((el) => el.name));
      });
  }

  public addFeatures(): void{
    const dialogRef = this.dialog.open(FeaturesComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.featuresItems = data;
        this.windowForm.get('features')?.setValue(data.map((el) => el.name));
      });
  }

  public addSectionCount(): void{
    const dialogRef = this.dialog.open(SectionCountComponent);

    dialogRef.afterClosed()
      .subscribe((data: ICalculatorChar[]) => {
        this.sectionCountItems = data;
        this.windowForm.get('sectionCount')?.setValue(data.map((el) => el.name));
      });
  }

  private createWindow(): void{
    this.windowService
      .createWindow(this.windowForm.value, this.imagesFiles)
      .subscribe({
        next: ({name, typeOfProductName}) => {
          this.windowForm.reset();
          this.windowForm.get('typeOfProductName')?.patchValue(typeOfProductName);
          this.snackbarConfigService.openSnackBar(`Вікно з ім'ям: ${name}, було успішно створено`)
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
  }

  private updateWindow(): void{
    this.windowService
      .updateWindow(this.windowForm.value, this.imagesFiles)
      .subscribe({
        next: (data: IWindow) => {
          this.data = data;
          this.windowForm.patchValue(data);
          if(data.productProducerName === null)
            this.windowForm.get('productProducerName')?.patchValue(this.noProductProducer.name);
          this.initSlashStylingOfFormFields();
          this.snackbarConfigService.openSnackBar(`Вікно з ім'ям: ${data.name}, було успішно змінено`)
        },
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
      })
  }

  private initProductProducers() {
    this.productProducerService
      .getWindowProductProducers()
      .subscribe(
        (producers: IProductProducer[]) => {
          this.windowProducers = [this.noProductProducer, ...producers];
          if(!this.isEditMode() || producers.length === 0 || this.data?.productProducerName === null)
            this.windowForm.get('productProducerName')?.setValue(this.windowProducers[0].name);
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

  private initMosquitoNetItems(): void{
    this.mosquitoNetService.getAllItems().subscribe({
      next: (items: ICalculatorChar[]) =>
        (this.mosquitoNetItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initWindowSillItems(): void{
    this.windowSillService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.windowSillItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initWindowEbbItems(): void{
    this.windowEbbService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.windowEbbItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initWindowHandItems(): void{
    this.windowHandService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.windowHandItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initChildLockItems(): void{
    this.childLockService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.childLockItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initHouseWifeItems(): void{
    this.housewifeStubService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.housewifeStubItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initGlassPocketAddItems(): void{
    this.glassPocketAddService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.glassPocketAddItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initProfileItems(): void{
    this.profileService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.profileItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initLaminationItems(): void{
    this.laminationService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.laminationItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initCamerasCountItems(): void{
    this.camerasCountService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.camerasCountItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initFeaturesItems(): void{
    this.featuresService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.featuresItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initSectionCountItems(): void{
    this.sectionCountService.getAllItems().subscribe({
      next:(items: ICalculatorChar[]) => 
        (this.sectionCountItems = items),
        error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  private initSlashStylingOfFormFields(){
    this.windowForm.get('mosquitoNet')?.setValue(this.data?.mosquitoNet?.map((el) => el.name));
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

  private imagesForUpdateProductPreview(): void{
    const prodImages = this.data?.images?.filter((image) => image !== 'assets/no_image.jpg');
    if(prodImages)
    prodImages.forEach((image) => {
      this.windowService
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
