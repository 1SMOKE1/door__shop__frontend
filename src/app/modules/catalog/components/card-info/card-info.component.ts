import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from 'src/app/modules/share/components/order-basket/order-basket/order-basket.component';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { CartLineService } from 'src/app/modules/share/services/common/cart-line.service';
import { HttpProductService } from 'src/app/modules/share/services/common/http-product.service';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalculatorChar } from 'src/app/modules/admin/interfaces/calculator-char.interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { IProductCaltulator } from 'src/app/modules/share/interfaces/common/product-calculator.interface';
import { ProductCalculatorModel } from 'src/app/modules/share/models/product-calculator.model';
import { ConvertingProductClass } from 'src/app/modules/admin/utils/converting-product.class';

@Component({
  selector: 'dsf-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent extends ConvertingProductClass implements OnInit{

  product: IProduct | null = null;
  productSubject: Subject<IProduct> = new Subject();
  product$: Observable<IProduct> = this.productSubject.asObservable();
  productSubscription: Subscription;
  TypeOfProductEnum: TypeOfProductEnum;

  startPrice: number = 0;


  selectedFabricMaterialWidth: ICalculatorChar = this.chooseConst;
  selectedFrameMaterial: ICalculatorChar = this.chooseConst;
  selectedDoorSelectionBoard: ICalculatorChar = this.chooseConst;
  selectedDoorWelt: ICalculatorChar = this.chooseConst;
  selectedDoorHand: ICalculatorChar = this.chooseConst;
  selectedDoorMechanism: ICalculatorChar = this.chooseConst;
  selectedDoorLoops: ICalculatorChar = this.chooseConst;
  selectedDoorStopper: ICalculatorChar = this.chooseConst;
  selectedDoorSlidingSystem: ICalculatorChar = this.chooseConst;

  selectedMosquitoNet: ICalculatorChar = this.chooseConst;
  selectedWindowSill: ICalculatorChar = this.chooseConst;
  selectedWindowEbb: ICalculatorChar = this.chooseConst;
  selectedWindowHand: ICalculatorChar = this.chooseConst;
  selectedChildLock: ICalculatorChar = this.chooseConst;
  selectedHousewifeStub: ICalculatorChar = this.chooseConst;
  selectedGlassPocketAdd: ICalculatorChar = this.chooseConst;
  selectedLamination: ICalculatorChar = this.chooseConst;
  selectedProfile: ICalculatorChar = this.chooseConst;



  constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpProductService: HttpProductService,
    private readonly cartLineService: CartLineService
  ) {
    super();
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap.get('id');
    const query = this.route.snapshot.queryParamMap.get(
      'typeOfProduct'
    ) as TypeOfProductEnum;
    if ( params && query) {
      this.initProduct(+params, query);
    } 

    this.productSubscription = this.product$.subscribe();
      
  }

  toBasket(): void {
    this.dialog.open(OrderBasketComponent, {
      data: {
        product: this.product,
      },
    });

    this.addCartLine();
    
  }

  private initProduct(id: number, typeOfProductName: TypeOfProductEnum) {
    this.httpProductService
      .getProduct(id, typeOfProductName)
      .subscribe({
        next: (product: IProduct) => {
          this.product = product;
          this.startPrice = this.product.price;
          this.productSubject.next(product);
          this.product.fabricMaterialWidth = [this.chooseConst, ...this.product.fabricMaterialWidth];
          this.product.doorFrameMaterial = [this.chooseConst, ...this.product.doorFrameMaterial];
          this.product.doorSelectionBoard = [this.chooseConst, ...this.product.doorSelectionBoard];
          this.product.doorWelt = [this.chooseConst, ...this.product.doorWelt];
          this.product.doorHand = [this.chooseConst, ...this.product.doorHand];
          this.product.doorMechanism = [this.chooseConst, ...this.product.doorMechanism];
          this.product.doorLoops = [this.chooseConst, ...this.product.doorLoops];
          this.product.doorStopper = [this.chooseConst, ...this.product.doorStopper];
          this.product.doorSlidingSystem = [this.chooseConst, ...this.product.doorSlidingSystem];

          this.product.mosquitoNet = [this.chooseConst, ... this.product.mosquitoNet];
          this.product.windowSill = [this.chooseConst, ... this.product.windowSill];
          this.product.windowEbb = [this.chooseConst, ... this.product.windowEbb];
          this.product.windowHand = [this.chooseConst, ... this.product.windowHand];
          this.product.childLock = [this.chooseConst, ... this.product.childLock];
          this.product.housewifeStub = [this.chooseConst, ... this.product.housewifeStub];
          this.product.glassPocketAdd = [this.chooseConst, ... this.product.glassPocketAdd];
          this.product.lamination = [this.chooseConst, ... this.product.lamination];
          this.product.profile = [this.chooseConst, ... this.product.profile];
        },
        error: () => this.router.navigate(['store', 'page-not-found'])
      });
  }

  private addCartLine(): void{

    if(this.product){
      const { 
         id,
         productProducer,
         typeOfProduct,
         name,
         country,
         guarantee,
         price,
         inStock,
      
         fabricMaterialThickness, // Товщина полотна // для обох дверей
         fabricMaterialHeight, // Висота полотна
         doorIsolation, // Шумоізоляція

    
         frameMaterialThickness, // Товщина короба
         doorInsulation, // Утеплення
         covering, // Оздоблення
         doorPeephole, // Глазок
         openingType, // Тип відкривання
         size, // Розмір
         lowerLock, // Нижній замок
         upperLock, // Верхній замок
         weight, // Вага
         metalThickness, // Товщина металу
         frameMaterialConstruction, // Конструкція короба
         sealerCircuit, // Контур Ущільнення
      

         windowWidth, // Ширина вікна
         windowHeight, // Висота вікна
         camerasCount, // Кількість камер
         features, // Особливості
         sectionsCount, // Кількість секцій
         description,
         homePage,
         images
      } = this.product
  
      const productCalculator: IProductCaltulator = new ProductCalculatorModel(
        id,
        typeOfProduct,
        productProducer,
        name,
        country,
        guarantee,
        price,
        inStock,
        fabricMaterialThickness,
        fabricMaterialHeight,
        this.selectedFabricMaterialWidth,
        doorIsolation,
        this.selectedFrameMaterial,
        this.selectedDoorSelectionBoard,
        this.selectedDoorWelt,
        this.selectedDoorHand,
        this.selectedDoorMechanism,
        this.selectedDoorLoops,
        this.selectedDoorStopper,
        this.selectedDoorSlidingSystem,
        frameMaterialThickness,
        doorInsulation,
        covering,
        doorPeephole,
        openingType,
        size,
        lowerLock,
        upperLock,
        weight,
        metalThickness,
        frameMaterialConstruction,
        sealerCircuit,
        this.selectedMosquitoNet,
        this.selectedWindowSill,
        this.selectedWindowEbb,
        this.selectedWindowHand,
        this.selectedChildLock,
        this.selectedHousewifeStub,
        this.selectedGlassPocketAdd,
        this.selectedLamination,
        this.selectedProfile,
        windowWidth,
        windowHeight,
        camerasCount,
        features,
        sectionsCount,
        description,
        homePage,
        images
      )
      this.cartLineService.addCartLine(productCalculator)
    }  
  }

  public addProp(): void{
    
    const addFabricMaterialWidth = this.convertNumber(this.selectedFabricMaterialWidth.price);
    const addDoorFrameMaterial = this.convertNumber(this.selectedFrameMaterial.price);
    const addDoorSelectionBoard = this.convertNumber(this.selectedDoorSelectionBoard.price);
    const addDoorWelt = this.convertNumber(this.selectedDoorWelt.price);
    const addDoorHand = this.convertNumber(this.selectedDoorHand.price);
    const addDoorMechanism = this.convertNumber(this.selectedDoorMechanism.price);
    const addDoorLoops = this.convertNumber(this.selectedDoorLoops.price);
    const addDoorStopper = this.convertNumber(this.selectedDoorStopper.price);
    const addDoorSlidingSystem = this.convertNumber(this.selectedDoorSlidingSystem.price);

    
    const addMosquitoNet = this.convertNumber(this.selectedMosquitoNet.price);
    const addWindowSill = this.convertNumber(this.selectedWindowSill.price);
    const addWindowEbb = this.convertNumber(this.selectedWindowEbb.price);
    const addWindowHand = this.convertNumber(this.selectedWindowHand.price);
    const addChildLock = this.convertNumber(this.selectedChildLock.price);
    const addHousewifeStub = this.convertNumber(this.selectedHousewifeStub.price);
    const addGlassPocketAdd = this.convertNumber(this.selectedGlassPocketAdd.price);
    const addLamination = this.convertNumber(this.selectedLamination.price);
    const addProfile = this.convertNumber(this.selectedProfile.price);
    
    this.product!.price = this.startPrice;

    this.product!.price += addFabricMaterialWidth
    + addDoorFrameMaterial 
    + addDoorSelectionBoard
    + addDoorWelt
    + addDoorHand
    + addDoorMechanism
    + addDoorLoops
    + addDoorStopper
    + addDoorSlidingSystem
    + addMosquitoNet
    + addWindowSill
    + addWindowEbb
    + addWindowHand
    + addChildLock
    + addHousewifeStub
    + addGlassPocketAdd
    + addLamination
    + addProfile
  }



 




}
