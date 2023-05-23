import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProductProducer } from 'src/app/modules/share/interfaces/common/product-producer.interface';
import { ITransformedEnum } from '../../../interfaces/transformed.enum.interface';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { ValidationService } from 'src/app/modules/share/services/common/validation.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IWindow } from 'src/app/modules/share/interfaces/common/window.interface';
import { ICalculatorChar } from '../../../interfaces/calculator-char.interface';
import { HttpProductProducerService } from 'src/app/modules/share/services/common/http-product-producer.service';
import { TransformEnumService } from '../../../services/transform-enum.service';
import { CountryEnum } from 'src/app/modules/share/enums/country.enum';
import { GuaranteeEnum } from 'src/app/modules/share/enums/guarantee.enum';
import { InStockEnum } from 'src/app/modules/share/enums/in-stock.enum';
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
import { SnackbarConfigService } from 'src/app/modules/share/services/common/snackbar-config.service';
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
    private readonly windowService: WindowService
  ){}

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

  public onImagesFolderSelected(e: Event): void {
    let cur = e.target as HTMLInputElement;
    if (cur.files) this.imagesFileList = cur.files;
  }

  public slashStylingOfFormField(fieldName: string): string | [] {
    return this.isEditMode() ? this.windowForm.get(fieldName)?.value.join('/') : [];
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

    dialogRef.afterClosed().subscribe(() => this.initMosquitoNetItems());
  }

  public addWindowSill(): void{
    const dialogRef = this.dialog.open(WindowSillComponent);

    dialogRef.afterClosed().subscribe(() => this.initWindowSillItems());
  }

  public addWindowEbb(): void{
    const dialogRef = this.dialog.open(WindowEbbComponent);

    dialogRef.afterClosed().subscribe(() => this.initWindowEbbItems());
  }

  public addWindowHand(): void{
    const dialogRef = this.dialog.open(WindowHandComponent);

    dialogRef.afterClosed().subscribe(() => this.initWindowHandItems());
  }

  public addChildLock(): void{
    const dialogRef = this.dialog.open(ChildLockComponent);

    dialogRef.afterClosed().subscribe(() => this.initChildLockItems());
  }

  public addHousewifeStub(): void{
    const dialogRef = this.dialog.open(HousewifeStubComponent);
    
    dialogRef.afterClosed().subscribe(() => this.initHouseWifeItems());
  }

  public addGlassPocketAdd(): void{
    const dialogRef = this.dialog.open(GlassPocketAddComponent);

    dialogRef.afterClosed().subscribe(() => this.initGlassPocketAddItems());
  }

  public addLamination(): void{
    const dialogRef = this.dialog.open(LaminationComponent);

    dialogRef.afterClosed().subscribe(() => this.initLaminationItems());
  }

  public addProfile(): void{
    const dialogRef = this.dialog.open(ProfileComponent);

    dialogRef.afterClosed().subscribe(() => this.initProfileItems());
  }

  public addCamerasCount(): void{
    const dialogRef = this.dialog.open(CamerasCountComponent);

    dialogRef.afterClosed().subscribe(() => this.initCamerasCountItems());
  }

  public addFeatures(): void{
    const dialogRef = this.dialog.open(FeaturesComponent);

    dialogRef.afterClosed().subscribe(() => this.initFeaturesItems());
  }

  public addSectionCount(): void{
    const dialogRef = this.dialog.open(SectionCountComponent);

    dialogRef.afterClosed().subscribe(() => this.initSectionCountItems());
  }

  private createWindow(): void{
    this.windowService
      .createWindow(this.windowForm.value, this.imagesFileList)
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
      .updateWindow(this.windowForm.value, this.imagesFileList)
      .subscribe({
        next: (data: IWindow) => {
          this.data = data;
          this.windowForm.patchValue(data);
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

}
