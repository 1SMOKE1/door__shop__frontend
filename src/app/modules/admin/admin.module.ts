import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRouterOutletComponent } from './components/admin-router-outlet/admin-router-outlet.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from '../share/share.module';
import { MainComponent } from './components/main/main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { ProductsComponent } from './components/products/products/products.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InteriorDoorComponent } from './components/products/interior-door/interior-door.component';
import { EntranceDoorComponent } from './components/products/entrance-door/entrance-door.component';
import { FurnitureComponent } from './components/products/furniture/furniture.component';
import { WindowComponent } from './components/products/window/window.component';
import { ExcelComponent } from './components/products/excel/excel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FabricMaterialWidthComponent } from './components/product-constants/fabric-material-width/fabric-material-width.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DoorIsolationComponent } from './components/product-constants/door-isolation/door-isolation.component';
import { DoorFrameMaterialComponent } from './components/product-constants/door-frame-material/door-frame-material.component';
import { DoorSelectionBoardComponent } from './components/product-constants/door-selection-board/door-selection-board.component';
import { DoorWeltComponent } from './components/product-constants/door-welt/door-welt.component';
import { DoorSlidingSystemComponent } from './components/product-constants/door-sliding-system/door-sliding-system.component';
import { DoorInsulationComponent } from './components/product-constants/door-insulation/door-insulation.component';
import { DoorCoveringComponent } from './components/product-constants/door-covering/door-covering.component';
import { OpeningTypeComponent } from './components/product-constants/opening-type/opening-type.component';
import { SizeComponent } from './components/product-constants/size/size.component';
import { WeightComponent } from './components/product-constants/weight/weight.component';
import { FrameMaterialConstractionComponent } from './components/product-constants/frame-material-constraction/frame-material-constraction.component';
import { SealerCircuitComponent } from './components/product-constants/sealer-circuit/sealer-circuit.component';
import { ProductProducersComponent } from './components/products/product-producers/product-producers.component';
import { MosquitoNetComponent } from './components/product-constants/mosquito-net/mosquito-net.component';
import { WindowSillComponent } from './components/product-constants/window-sill/window-sill.component';
import { WindowEbbComponent } from './components/product-constants/window-ebb/window-ebb.component';
import { WindowHandComponent } from './components/product-constants/window-hand/window-hand.component';
import { ChildLockComponent } from './components/product-constants/child-lock/child-lock.component';
import { HousewifeStubComponent } from './components/product-constants/housewife-stub/housewife-stub.component';
import { GlassPocketAddComponent } from './components/product-constants/glass-pocket-add/glass-pocket-add.component';
import { LaminationComponent } from './components/product-constants/lamination/lamination.component';
import { ProfileComponent } from './components/product-constants/profile/profile.component';
import { CamerasCountComponent } from './components/product-constants/cameras-count/cameras-count.component';
import { FeaturesComponent } from './components/product-constants/features/features.component';
import { SectionCountComponent } from './components/product-constants/section-count/section-count.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdminOurWorksComponent } from './components/admin-our-works/admin-our-works.component';
import { OurWorksDialogComponent } from './components/admin-our-works/our-works-dialog/our-works-dialog.component';
import { OurCommentsDialogComponent } from './components/admin-our-works/our-comments-dialog/our-comments-dialog.component';

@NgModule({
  declarations: [
    AdminRouterOutletComponent,
    SignInComponent,
    MainComponent,
    AdminHeaderComponent,
    ProductsComponent,
    InteriorDoorComponent,
    EntranceDoorComponent,
    FurnitureComponent,
    WindowComponent,
    ExcelComponent,
    FabricMaterialWidthComponent,
    DoorIsolationComponent,
    DoorFrameMaterialComponent,
    DoorSelectionBoardComponent,
    DoorWeltComponent,
    DoorSlidingSystemComponent,
    DoorInsulationComponent,
    DoorCoveringComponent,
    OpeningTypeComponent,
    SizeComponent,
    WeightComponent,
    FrameMaterialConstractionComponent,
    SealerCircuitComponent,
    ProductProducersComponent,
    MosquitoNetComponent,
    WindowSillComponent,
    WindowEbbComponent,
    WindowHandComponent,
    ChildLockComponent,
    HousewifeStubComponent,
    GlassPocketAddComponent,
    LaminationComponent,
    ProfileComponent,
    CamerasCountComponent,
    FeaturesComponent,
    SectionCountComponent,
    AdminOrdersComponent,
    AdminOurWorksComponent,
    OurWorksDialogComponent,
    OurCommentsDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    ShareModule,
    MatSidenavModule,
    MatIconModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonToggleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AdminModule { }
