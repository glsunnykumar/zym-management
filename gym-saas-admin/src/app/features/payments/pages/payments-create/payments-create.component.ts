import { Component, inject } from '@angular/core';
import { PaymentFormComponent } from "../../components/payment-form/payment-form.component";
import { PageHeaderComponent } from "../../../../shared/ui/layout/page-header/page-header.component";
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { PageLayoutComponent } from "../../../../shared/ui/layout/page-layout/page-layout.component";

@Component({
  selector: 'app-payments-create',
  imports: [PaymentFormComponent, PageHeaderComponent, PageLayoutComponent],
  templateUrl: './payments-create.component.html',
  styleUrl: './payments-create.component.scss'
})
export class PaymentsCreateComponent {

     private readonly router =
      inject(Router);
  
    private readonly paymentService =
      inject(PaymentService);
  

  createPayment(payment: any): void {

  this.paymentService
    .createPayment({
      ...payment,
      createdAt: Date.now()
    })
    .then(() => {

      this.router.navigate([
        '/payments'
      ]);

    });

}

onCancel(): void {

  this.router.navigate([
    '/payments'
  ]);

}

}
