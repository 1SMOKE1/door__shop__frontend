import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, interval, delay, Subscription } from 'rxjs';
import { CardService } from 'src/app/modules/catalog/services/card.service';
import { TypeOfProductEnum } from 'src/app/modules/share/enums/type-of-product.enum';
import { IGetProducts } from 'src/app/modules/share/interfaces/common/get-products.interface';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { SidebarService } from 'src/app/modules/share/services/common/sidebar.service';
import { InteriorDoorComponent } from '../interior-door/interior-door.component';
import { EntranceDoorComponent } from '../entrance-door/entrance-door.component';
import { FurnitureComponent } from '../furniture/furniture.component';
import { WindowComponent } from '../window/window.component';
import { ExcelComponent } from '../excel/excel.component';
import { UpdateInteriorDoorModel } from '../../../models/update-interiori-door.model';

@Component({
  selector: 'dsf-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  filtrationSubsctiption!: Subscription;
  spinnerSubscription!: Subscription;

  page: number = 1; // currentPage
  itemsPerPage: number = 8;
  productsLength: number = 0;
  products: IProduct[] = [];
  spinnerValue: number = 0;

  emptyProducts: boolean = false;

  constructor(
    private readonly cardService: CardService,
    private readonly sidebarService: SidebarService,
    private readonly dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getFilteredProducts();
    this.filtrationSubsctiption = this.sidebarService.filtration$
      .pipe(
        map((el: IGetProducts) => {
          this.emptyProducts = false;
          this.products = [];
          this.spinnerSubscription = interval(10)
          .subscribe((value: number) => {
            this.spinnerValue += value;
          })
          return el
        }),
        delay(1000),

      )
      .subscribe(({products, productsLength}: IGetProducts) => {
        this.products = products;
        this.productsLength = productsLength;
        if(products.length == 0)
          this.emptyProducts = true;
        else
          this.emptyProducts = false;
        this.spinnerSubscription.unsubscribe();
        this.spinnerValue = 0;
      })
  }

  ngOnDestroy(): void {
    this.filtrationSubsctiption.unsubscribe();
    this.sidebarService.checkBoxArr = [];
  }

  public cardBigRedirect(id: number, typeOfProductName: TypeOfProductEnum): void{
    this.cardService.cardInfoRedirect(id, typeOfProductName);
  }

  public changePage(page: number) {
    this.page = page;
    this.getFilteredProducts(page ? page : 1);
  }

  public getFilteredProducts(page?: number){
    this.sidebarService.doFiltration(page ? page : 1, this.itemsPerPage);
  }

  public createInteriorDoorCard(){
    const dialogRef = this.dialog.open(InteriorDoorComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.getFilteredProducts())
  }

  public createEntranceDoorCard(){
    const dialogRef = this.dialog.open(EntranceDoorComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.getFilteredProducts())
  }

  public createFurnitureCard(){
    const dialogRef = this.dialog.open(FurnitureComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.getFilteredProducts())
  }

  public createWindowCard(){
    const dialogRef = this.dialog.open(WindowComponent);

    dialogRef.afterClosed()
    .subscribe(() => this.getFilteredProducts())
  }

  public excel(){
    this.dialog.open(ExcelComponent);
  }

  public updateProduct(product: IProduct, typeOfProductName: string){

    const {
      id, productProducer, typeOfProduct, name,
      country, guarantee, price,
      inStock, 
      // 
      fabricMaterialThickness,
      fabricMaterialHeight,
      fabricMaterialWidth,
      doorIsolation,
      doorFrameMaterial,
      doorSelectionBoard,
      doorWelt,
      doorHand,
      doorMechanism,
      doorLoops,
      doorStopper,
      doorSlidingSystem,
      // 
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
      // 
      mosquitNet,
      windowSill,
      windowEbb,
      windowHand,
      childLock,
      housewifeStub,
      glassPocketAdd,
      lamination,
      profile,
      windowWidth,
      windowHeight,
      camerasCount,
      features,
      sectionsCount,
      description,
      homePage,
      images
    } = product
    switch(typeOfProductName){
      case TypeOfProductEnum.interiorDoor:{
        const dialogRef = this.dialog.open(InteriorDoorComponent, {
          data: new UpdateInteriorDoorModel(
            id,
            name,
            productProducer!.name,
            typeOfProduct.name, country, guarantee,
            +price, inStock,
            fabricMaterialThickness ? +fabricMaterialThickness : 0,
            fabricMaterialHeight ? +fabricMaterialHeight : 0,
            fabricMaterialWidth ? fabricMaterialWidth : [],
            doorIsolation ? doorIsolation : [],
            doorFrameMaterial ? doorFrameMaterial : [],
            doorSelectionBoard ? doorSelectionBoard : [],
            doorWelt ? doorWelt : [],
            doorHand ? doorHand : [],
            doorMechanism ? doorMechanism : [],
            doorLoops ? doorLoops : [],
            doorStopper ? doorStopper : [],
            doorSlidingSystem ? doorSlidingSystem : [],
            description,
            homePage,
            images
          )
        });
        dialogRef.afterClosed()
        .subscribe(() => this.getFilteredProducts());
        break;
      }
      case TypeOfProductEnum.entranceDoor: {
        const dialogRef = this.dialog.open(EntranceDoorComponent, {
          data: product
        });
        dialogRef.afterClosed()
        .subscribe(() => this.getFilteredProducts());
        break;
      }
      case TypeOfProductEnum.furniture: {
        const dialogRef = this.dialog.open(FurnitureComponent, {
          data: product
        });
        dialogRef.afterClosed()
        .subscribe(() => this.getFilteredProducts());
        break;
      }
      case TypeOfProductEnum.windows: {
        const dialogRef = this.dialog.open(WindowComponent, {
          data: product
        });
        dialogRef.afterClosed()
        .subscribe(() => this.getFilteredProducts());
        break;
      }
      
    }
  }

  public deleteProduct(id: number, typeOfProductName: string){
    
  }
}