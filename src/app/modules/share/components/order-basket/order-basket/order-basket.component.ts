import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartLineService } from '../../../services/common/cart-line.service';
import { ICartLine } from '../../../interfaces/common/cart-line.interface';
import { OrderBasketService } from '../../../services/common/order-basket.service';
import { DOCUMENT } from '@angular/common';
import { IProductCaltulator } from '../../../interfaces/common/product-calculator.interface';

@Component({
  selector: 'dsf-order-basket',
  templateUrl: './order-basket.component.html',
  styleUrls: ['./order-basket.component.scss'],
})
export class OrderBasketComponent implements AfterViewInit {
  window: Window | null;
  @ViewChild('orderForm', { static: false }) public elemOrderForm!: ElementRef;
  @ViewChild('carouselLine', { static: false })
  public carouselLine!: ElementRef;
  @ViewChild('carouselWrap', { static: false })
  public carouselWrap!: ElementRef;
  @ViewChild('orderBasket', { static: false }) public orderBasket!: ElementRef;
  @ViewChild('emptyBasket', { static: true })
  public emptyBasket!: TemplateRef<any>;
  @ViewChild('btnToForm', { static: true }) public btnToForm!: ElementRef;
  cartLines: ICartLine[] = [];
  sendForm: boolean = false;

  constructor(
    public readonly cartLineService: CartLineService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly orderBasketService: OrderBasketService,
    @Inject(DOCUMENT) docRef: Document
  ) {
    this.window = docRef.defaultView;
  }

  ngOnInit(): void {
    this.getCartLines();
  }

  decrease(product: IProductCaltulator) {
    this.cartLineService.decrease(product);
  }

  increase(product: IProductCaltulator) {
    this.cartLineService.increase(product);
  }

  clearCartLines(): void {
    this.cartLineService.clearCartLines();
    this.getCartLines();
  }

  private getCartLines(): void {
    this.cartLines = this.cartLineService.getCartLines();
  }

  deleteCartLine(product: IProductCaltulator): void {
    this.cartLineService.deleteCartLine(product);
    this.getCartLines();
  }

  getTotal(): number {
    return this.cartLineService.getTotal();
  }

  toCatalog(): void {
    this.dialog.closeAll();
    this.router.navigate(['store', 'catalog']);
  }

  toOrderForm(e: Event): void {
    this.btnMove(e);

    const carouselLine = this.carouselLine.nativeElement as HTMLElement;
    const orderForm = this.elemOrderForm.nativeElement as HTMLElement;
    carouselLine.style.transform = `translate(-${orderForm.offsetWidth}px)`;
    setTimeout(() => {
      orderForm.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 1300);
  }

  goBackFromForm(e?: Event): void {
    this.btnMove(e);

    const carouselLine = this.carouselLine.nativeElement as HTMLElement;
    carouselLine.style.transform = `translate(${0}px)`;
  }

  sendEmitFromForm(e: Event): void {
    this.sendForm = !this.sendForm;
  }

  toCatalogAfterSubmit(): void {
    this.sendForm = false;
    this.goBackFromForm();
    this.cartLineService.clearCartLines();
    this.dialog.closeAll();
    this.router.navigate(['store', 'catalog']);
  }

  ngAfterViewInit(): void {
    const adaptiveFn = (): void => {
      if (
        this.carouselWrap &&
        this.carouselLine &&
        this.window!.innerWidth <= 1200
      ) {
        const carouselWrap = this.carouselWrap?.nativeElement as HTMLElement;
        carouselWrap.style.width = this.window!.innerWidth - 240 + 'px';
        const orderBasket = this.orderBasket?.nativeElement as HTMLElement;
        orderBasket.style.width = this.window!.innerWidth - 240 + 'px';
        const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
        carouselLine.style.width = (this.window!.innerWidth - 240) * 2 + 'px';
        if (this.window!.innerWidth < 750) {
          carouselWrap.style.width = this.window!.innerWidth - 30 + 'px';
          orderBasket.style.width = this.window!.innerWidth - 30 + 'px';
          carouselLine.style.width = (this.window!.innerWidth - 30) * 2 + 'px';
        }

        for (const child of carouselLine.children as any) {
          child.style.width = carouselWrap.offsetWidth + 'px';
          child.style.height = 'auto';
        }
        this.goBackFromForm();
      }
    };
    this.window?.addEventListener('resize', adaptiveFn);
    adaptiveFn();
  }

  private btnMove(e: Event | undefined): void {
    if (e) {
      const curBtn = e.target as HTMLElement;
      curBtn.setAttribute('disabled', 'true');
      setTimeout(() => {
        curBtn.removeAttribute('disabled');
      }, 2500);
    }
  }
}
