import { Component, OnInit, OnChanges, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from '@modules/share/components/order-basket/order-basket/order-basket.component';
import { IProduct } from '@modules/share/interfaces/common/product.interface';
import { CartLineService } from '@modules/share/services/cart-line.service';
import { HttpProductService } from '@share-services/http-product.service';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ICalculatorChar } from '@modules/admin/interfaces/calculator-char.interface';
import { Subscription } from 'rxjs';
import { IProductCaltulator } from '@modules/share/interfaces/common/product-calculator.interface';
import { ProductCalculatorModel } from '@modules/share/models/product-calculator.model';
import { ConvertingProductClass } from '@modules/admin/utils/converting-product.class';
import { ProductService } from '../../services/product.service';
import { ShowBigImgComponent } from '@modules/share/components/show-big-img/show-big-img.component';
import { ICarouselImage } from '@modules/admin/interfaces/carousel-image.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselMoveEnum } from '@modules/catalog/enum/carouselMoveEnum';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'dsf-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent extends ConvertingProductClass implements OnInit, AfterViewInit{
  window: Window | null;
  @ViewChild('carousel', {static: true}) carousel: ElementRef;
  @ViewChild('carouselContent', {static: false}) carouselContent: ElementRef;
  @ViewChild('photoArr', {static: false}) photoArr: ElementRef

  carouselMoveEnum = CarouselMoveEnum;
  carouselIndex: number = 0;

  product: IProduct | null = null;
  
  productSubscription: Subscription;
  TypeOfProductEnum: TypeOfProductEnum;

  choosenItemImage: string = '';
  choosenItemImageClass: string = 'photos-arr-img-choosen';

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

  productImages: ICarouselImage[] = [];

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: false,
    nav: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    responsiveRefreshRate: 200,
    dotsData: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };

 
  

  constructor(
    public readonly productService: ProductService,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpProductService: HttpProductService,
    private readonly cartLineService: CartLineService,
    @Inject(DOCUMENT) docRef: Document
  ) {
    super();
    this.window = docRef.defaultView;
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap.get('id');
    const query = this.route.snapshot.queryParamMap.get(
      'typeOfProduct'
    ) as TypeOfProductEnum;
    if ( params && query) {
      this.initProduct(+params, query);
    } 

    this.productSubscription = this.productService.product$.subscribe();
    if(this.product)
    this.choosenItemImage = this.product?.images[0];
  }

  ngAfterViewInit(): void {
    const carousel = this.carousel.nativeElement as HTMLDivElement;
    const carouselContent = this.carouselContent.nativeElement as HTMLDivElement;
    carouselContent.style.width = `${carousel.offsetWidth * this.productImages.length}px`;

    const adaptiveFn = () => {
      carouselContent.style.width = `${carousel.offsetWidth * this.productImages.length}px`;
      carouselContent.style.transform = `translate(-${carousel.offsetWidth * this.carouselIndex}px)`;
      for(let item of carouselContent.children as any){
        item.style.width = carousel.offsetWidth + 'px';
      }
      
    }
  
    this.window?.addEventListener('resize', adaptiveFn)
    adaptiveFn();
  }
  
  public toBasket(): void {
    this.dialog.open(OrderBasketComponent, {
      data: {
        product: this.product,
      },
    });

    this.addCartLine();
    
  }

  public showBigImg(e: Event): void{
    let cur = e.target as HTMLImageElement;
    let img = cur.src;
    let dialogRef = this.dialog.open(ShowBigImgComponent, {
      data: img
    })
    dialogRef.updateSize('800px', '800px');
  }

  private initProduct(id: number, typeOfProductName: TypeOfProductEnum) {
    this.httpProductService
      .getProduct(id, typeOfProductName)
      .subscribe({
        next: (product: IProduct) => {
          this.product = product;
          this.startPrice = this.product.price;
          this.choosenItemImage = this.product.images[0];
          this.productService.productSubject.next(product);
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
          this.productImages = this.convertToCarouselImages(this.product.images);
          const carousel = this.carousel.nativeElement as HTMLDivElement;
          const carouselContent = this.carouselContent.nativeElement as HTMLDivElement;
          carouselContent.style.width = `${carousel.offsetWidth * this.productImages.length}px`;
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
        images,
        this.choosenItemImage
      )
      this.cartLineService.addCartLine(productCalculator)
    }  
  }

  public choosenImage(index: number, e?: Event, image?: string) {
    const carousel = this.carousel.nativeElement as HTMLDivElement;
    const carouselContent = this.carouselContent.nativeElement as HTMLDivElement;
    this.carouselIndex = index;


  
    if(this.carouselIndex === this.productImages.length){
      this.carouselIndex = 0;
      carouselContent.style.transform = `translate(-${carousel.offsetWidth * this.carouselIndex}px)`;
    }

    if(this.carouselIndex < 0){
      this.carouselIndex = this.productImages.length - 1;
      carouselContent.style.transform = `translate(-${carousel.offsetWidth * this.carouselIndex}px)`;
    }

    const cur = this.photoArr.nativeElement as HTMLDivElement;
    for(let item of cur.children){
      if(item.classList.contains('photos-arr-img-choosen'))
        item.classList.remove('photos-arr-img-choosen')
    }
    cur.children[this.carouselIndex]?.classList.add('photos-arr-img-choosen')

    const imageEl = cur.children[this.carouselIndex].children[0] as HTMLImageElement;
    
    this.choosenItemImage = imageEl.getAttribute('src') as string;
  
    if(e){
      const cur = (e.target as HTMLImageElement).parentElement;
      const wrapperOfElems = cur?.parentElement as HTMLDivElement;
      for(let item of wrapperOfElems.children){
        if(item.classList.contains('photos-arr-img-choosen'))
          item.classList.remove('photos-arr-img-choosen')
      }
      cur?.classList.add('photos-arr-img-choosen')
    }
    if(image)
    this.choosenItemImage = image;

    carouselContent.style.transform = `translate(-${carousel.offsetWidth * this.carouselIndex}px)`;
    

    
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

  private convertToCarouselImages(arr: string[]):ICarouselImage[]{
    return arr.map((el, i): ICarouselImage => ({imgSrc: el, imgAlt: '', id: ++i}))
  }

  




}
