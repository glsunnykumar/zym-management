import {
  Component,
  inject,
  signal,
  OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { PaymentService }
from '../../services/payment.service';

import { Payment }
from '../../models/payment.model';

import { PageLayoutComponent }
from '../../../../shared/ui/layout/page-layout/page-layout.component';

import { PageHeaderComponent }
from '../../../../shared/ui/layout/page-header/page-header.component';

import { PaymentFormComponent }
from '../../components/payment-form/payment-form.component';

@Component({
  selector: 'gf-payment-edit',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    PaymentFormComponent
  ],
  templateUrl: './payments-edit.component.html',
  styleUrl: './payments-edit.component.scss'
})
export class PaymentEditComponent
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly paymentService =
    inject(PaymentService);

  readonly payment =
    signal<Payment | null>(null);

  async ngOnInit(): Promise<void> {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    const payment =
      await this.paymentService
        .getPaymentById(id);

    this.payment.set(payment);

  }

  async updatePayment(
    value: any
  ): Promise<void> {

    const payment =
      this.payment();

    if (!payment) {
      return;
    }

    await this.paymentService
      .updatePayment(
        payment.id,
        value
      );

    this.router.navigate([
      '/payments'
    ]);

  }

  onCancel(): void {

    this.router.navigate([
      '/payments'
    ]);

  }

}