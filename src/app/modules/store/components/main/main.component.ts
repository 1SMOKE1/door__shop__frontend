import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ISecondNavLink } from '../../interfaces/common/second-nav-link.interface';
import { IProduct } from '@modules/share/interfaces/common/product.interface';
import { NavService } from '@modules/share/services/common/nav.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@modules/share/services/common/validation.service';
import { ScrollConditionEnum } from '@modules/share/enums/scroll-condition.enum';
import { HttpProductService } from '@modules/share/services/common/http-product.service';
import { map } from 'rxjs';
import { MainService } from '../../services/common/main.service';
import { IZamirForm } from '../../interfaces/common/zamir-form.interface';
import { IConsultationForm } from '../../interfaces/common/consultation-form.interface';
import { IZamirFormResponse } from '../../interfaces/response/zamir-form.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IConsultationFormResponse } from '../../interfaces/response/consultation-form.interface';
import { CardService } from '@modules/catalog/services/card.service';
import { HandleFormsErrorService } from '@modules/share/services/errors/handle-forms-error.service';

@Component({
  selector: 'dsf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  secondNavLinks: ISecondNavLink[] = [
    { text: 'Наші виробники', path: '/store/contacts' },
    { text: 'Двері міжкімнатні', path: '/store/catalog' },
    { text: 'Двері вхідні', path: '/store/catalog' },
    { text: 'Вікна', path: '/store/catalog' },
    { text: 'Фурнітура', path: '/store/catalog' },
  ];

  products: IProduct[] = [];

  @ViewChild('freeZamir') freeZamir: ElementRef;
  @ViewChild('freeConsultation') freeConsultation: ElementRef;
  constructor(
    private readonly navService: NavService,
    private readonly validationService: ValidationService,
    private readonly httpProductService: HttpProductService,
    private readonly mainService: MainService,
    private readonly snackbar: MatSnackBar,
    private readonly cardService: CardService,
    private readonly handleFormsErrorService: HandleFormsErrorService
  ) {}

  consultationForm: FormGroup<IConsultationForm> = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.phonePattern()),
    ]),
  });

  zamirForm: FormGroup<IZamirForm> = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validationService.phonePattern()),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.navService.freeFormSubscribtion = this.navService.freeForm$.subscribe(
      (string: string | void) => {
        switch (string) {
          case `${ScrollConditionEnum.SCROLL}-${ScrollConditionEnum.ZAMIR}`:
            this.navService.scroll(this.freeZamir.nativeElement);
            break;
          case `${ScrollConditionEnum.BLIMING}-${ScrollConditionEnum.ZAMIR}`:
            this.blimingForm('flashing2', this.freeZamir);
            break;
          case `${ScrollConditionEnum.SCROLL}-${ScrollConditionEnum.CONSULTATION}`:
            this.navService.scroll(this.freeConsultation.nativeElement);
            break;
          case `${ScrollConditionEnum.BLIMING}-${ScrollConditionEnum.CONSULTATION}`:
            this.blimingForm('flashing', this.freeConsultation);
            break;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.navService.freeFormSubscribtion.unsubscribe();
  }

  public sendZamirForm(): void {
    this.mainService.sendZamirForm(this.zamirForm.value).subscribe({
      next: ({ name }: IZamirFormResponse) => {
        this.zamirForm.reset();
        this.snackbar.open(this.mainService.successForm(name), 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 10000,
        });
      },
      error: (err: Error) =>
        this.handleFormsErrorService.snackbarShowError(err),
    });
  }

  public sendConsultationForm(): void {
    this.mainService
      .sendConsultationForm(this.consultationForm.value)
      .subscribe({
        next: ({ name }: IConsultationFormResponse) => {
          this.consultationForm.reset();
          this.snackbar.open(this.mainService.successForm(name), 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 10000,
          });
        },
        error: (err: Error) => {
          this.handleFormsErrorService.snackbarShowError(err);
        },
      });
  }

  public redirectToCard(id: number): void {
    const product = this.products.find((el: IProduct) => el.id === id);

    this.cardService.cardInfoRedirect(id, product!.typeOfProduct.name);
  }

  private blimingForm(classAdd: string, elementRef: ElementRef) {
    const elem = elementRef.nativeElement as HTMLElement;
    setTimeout(() => {
      elem.classList.add(classAdd);
    }, 1000);
    setTimeout(() => {
      elem.classList.remove(classAdd);
    }, 2000);
  }

  private getProducts(): void {
    this.httpProductService
      .getHttpProducts()
      .pipe(map((el: IProduct[]) => el.filter((el: IProduct) => el.homePage)))
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });
  }
}
