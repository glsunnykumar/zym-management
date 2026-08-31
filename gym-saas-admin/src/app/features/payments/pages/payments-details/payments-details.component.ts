import { Component, inject, signal, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { PaymentService } from '../../services/payment.service';

import { Payment } from '../../models/payment.model';

import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';

import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Member } from '../../../members/models/member.model';
import { Plan } from '../../../plans/models/plan.model';
import { MemberService } from '../../../members/services/member.service';
import { PlanService } from '../../../plans/services/plan.service';

@Component({
  selector: 'gf-payment-details',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './payments-details.component.html',
  styleUrl: './payments-details.component.scss',
})
export class PaymentDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly paymentService = inject(PaymentService);

  readonly payment = signal<Payment | null>(null);

  private readonly memberService =
  inject(MemberService);

private readonly planService =
  inject(PlanService);

  readonly member =
  signal<Member | null>(null);

readonly plan =
  signal<Plan | null>(null);

  private readonly dialog =
  inject(MatDialog);

async ngOnInit(): Promise<void> {

  const id =
    this.route.snapshot.paramMap.get('id');

  if (!id) {
    return;
  }

  const payment =
    await this.paymentService
      .getPaymentById(id);

  if (!payment) {
    return;
  }

  this.payment.set(payment);

  const members =
    await firstValueFrom(
      this.memberService.getMembers()
    );

  const plans =
    await firstValueFrom(
      this.planService.getPlans()
    );

  const member =
    members.find(
      m => m.id === payment.memberId
    );

  const plan =
    plans.find(
      p => p.id === payment.planId
    );

  this.member.set(
    member ?? null
  );

  this.plan.set(
    plan ?? null
  );

}
  editPayment(): void {
    const payment = this.payment();

    if (!payment) {
      return;
    }

    this.router.navigate(['/payments', payment.id, 'edit']);
  }

  async deletePayment(): Promise<void> {
    const payment = this.payment();

    if (!payment) {
      return;
    }

    const confirmed = await this.dialog
      .open(ConfirmDialogComponent, {
        width: '420px',

        data: {
          title: 'Delete Payment',

          message: `Are you sure you want to delete this payment of ₹${payment.amount}?`,

          confirmText: 'Delete',

          cancelText: 'Cancel',
        },
      })
      .afterClosed()
      .toPromise();

    if (!confirmed) {
      return;
    }

    await this.paymentService.deletePayment(payment.id);

    this.router.navigate(['/payments']);
  }
}
