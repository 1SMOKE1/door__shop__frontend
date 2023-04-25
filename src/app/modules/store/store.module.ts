import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './components/main/main.component';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowOrderComponent } from './components/how-order/how-order.component';
import { GuaranteeComponent } from './components/guarantee/guarantee.component';
import { DoorZamirComponent } from './components/door-zamir/door-zamir.component';
import { DoorInstallationComponent } from './components/door-installation/door-installation.component';
import { DesignersBuildersComponent } from './components/designers-builders/designers-builders.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ChooseDoorComponent } from './components/choose-door/choose-door.component';
import { CertificatesComponent } from './components/certificates/certificates/certificates.component';
import { ShowCertificateComponent } from './components/certificates/show-certificate/show-certificate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    MainComponent,
    HowOrderComponent,
    GuaranteeComponent,
    DoorZamirComponent,
    DoorInstallationComponent,
    DesignersBuildersComponent,
    ContactsComponent,
    CommentsComponent,
    ChooseDoorComponent,
    CertificatesComponent,
    ShowCertificateComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class StoreModule { }
