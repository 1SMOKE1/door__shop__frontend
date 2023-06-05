import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InteriorDoorService } from '../../services/products/interior-door.service';
import { SnackbarConfigService } from '@modules/share/services/common/snackbar-config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EntranceDoorService } from '../../services/products/entrance-door.service';
import { ProductService } from '@modules/catalog/services/product.service';
import { TypeOfProductEnum } from '@modules/share/enums/type-of-product.enum';
import { FurnitureService } from '../../services/products/furniture.service';
import { WindowService } from '../../services/products/window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dsf-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly snackbarConfigService: SnackbarConfigService,
    private readonly interiorDoorService: InteriorDoorService,
    private readonly entranceDoorService: EntranceDoorService,
    private readonly furnitureService: FurnitureService,
    private readonly windowService: WindowService,
    private readonly productsService: ProductService,
    private readonly router: Router

  ){}

  public deleteAllInteriorDoors(): void{
    this.interiorDoorService
    .deleteAllInteriorDoors()
    .subscribe({
      next: (answer: string) => {
        this.snackbarConfigService.openSnackBar(answer);
        this.productsService.initReloadProducts.next(`${TypeOfProductEnum.interiorDoor}`);
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  public deleteAllEntranceDoors(): void{
    this.entranceDoorService
    .deleteAllEntranceDoors()
    .subscribe({
      next: (answer: string) => {
        this.snackbarConfigService.openSnackBar(answer);
        this.productsService.initReloadProducts.next(`${TypeOfProductEnum.entranceDoor}`)
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  public deleteAllFurnitures(): void{
    this.furnitureService
    .deleteAllFurnitures()
    .subscribe({
      next: (answer: string) => {
        this.snackbarConfigService.openSnackBar(answer);
        this.productsService.initReloadProducts.next(`${TypeOfProductEnum.furniture}`)
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  public deleteAllWindows(): void{
    this.windowService
    .deleteAllWindows()
    .subscribe({
      next: (answer: string) => {
        this.snackbarConfigService.openSnackBar(answer);
        this.productsService.initReloadProducts.next(`${TypeOfProductEnum.windows}`)
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }

  logout(){
    this.authService
    .logout()
    .subscribe({
      next: () => {
        this.router.navigate(['admin', 'sign-in']);
        this.snackbarConfigService.openSnackBar('Ви вийшли з адмінки');
      },
      error: (err: HttpErrorResponse) => this.snackbarConfigService.showError(err)
    })
  }
}
