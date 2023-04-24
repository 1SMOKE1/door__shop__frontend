import { Component } from '@angular/core';
import { ISecondNavLink } from '../../interfaces/ISecondNavLink';
import { IProduct } from 'src/app/modules/share/interfaces/common/product.interface';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { NavService } from 'src/app/modules/share/services/nav.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/modules/share/services/validation.service';

@Component({
  selector: 'dsf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  secondNavLinks: ISecondNavLink[] = [
    { text: 'Наші виробники', path: '/contacts' },
    { text: 'Двері міжкімнатні', path: '/catalog' },
    { text: 'Двері вхідні', path: '/catalog' },
    { text: 'Вікна', path: '/catalog' },
    { text: 'Фурнітура', path: '/catalog' },
  ];

  products: IProduct[] = [];

  constructor(
    private readonly mainService: MainService,
    private readonly router: Router,
    private readonly navService: NavService,
    private readonly validationService: ValidationService
  ) {}

  consultationForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.phonePattern()),
    ]),
  });

  zamirForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.phonePattern()),
    ]),
    address: new FormControl('', Validators.required),
  });

  sendZamirForm(): void {}

  sendConsultationForm(): void {}

  redirectToCard(id: number): void {}
}
