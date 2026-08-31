import { Component, computed, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

import { MatDialog } from '@angular/material/dialog';

import { PaymentService } from '../../services/payment.service';

import { Payment } from '../../models/payment.model';

import { TableColumn } from '../../../../shared/models/table-column.model';

import { TableAction } from '../../../../shared/models/table-action.model';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchToolbarComponent } from '../../../../shared/components/search-toolbar/search-toolbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MemberService } from '../../../members/services/member.service';
import { PlanService } from '../../../plans/services/plan.service';

@Component({
  selector: 'gf-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.scss',
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    MatIconModule,
    SearchToolbarComponent,
    MatInputModule,
    MatSelect,
    MatOption,
    MatButtonModule,
    DataTableComponent,
  ],
})
export class PaymentsListComponent {
  private readonly paymentService = inject(PaymentService);

  private readonly memberService = inject(MemberService);

  private readonly planService = inject(PlanService);

  private readonly router = inject(Router);

  private readonly dialog = inject(MatDialog);

  readonly payments = toSignal(this.paymentService.getPayments(), {
    initialValue: [],
  });

  readonly members = toSignal(this.memberService.getMembers(), {
    initialValue: [],
  });

  readonly plans = toSignal(this.planService.getPlans(), {
    initialValue: [],
  });

  readonly search = signal('');

  readonly statusFilter = signal('');

  readonly columns: readonly TableColumn<Payment>[] = [
    {
      key: 'memberName',
      label: 'Member',
      sortable: true,
    },

    {
      key: 'planName',
      label: 'Plan',
    },

    {
      key: 'amount',
      label: 'Amount',
    },

    {
      key: 'paymentMethod',
      label: 'Method',
    },

    {
      key: 'paymentDate',
      label: 'Date',
    },

    {
      key: 'status',
      label: 'Status',
      type: 'status',
    },
  ];

  readonly actions: readonly TableAction<Payment>[] = [
    {
      id: 'view',
      icon: 'visibility',
      label: 'View',
    },

    {
      id: 'edit',
      icon: 'edit',
      label: 'Edit',
    },

    {
      id: 'delete',
      icon: 'delete',
      label: 'Delete',
    },
  ];

  readonly paymentsVm = computed(() => {
    return this.payments().map((payment) => {
      const member = this.members().find((m) => m.id === payment.memberId);

      const plan = this.plans().find((p) => p.id === payment.planId);

      return {
        ...payment,

        memberName: member?.name ?? 'Unknown',

        planName: plan?.name ?? 'No Plan',
      };
    });
  });

  readonly filteredPayments = computed(() => {
    let data = [...this.payments()];

    const search = this.search().toLowerCase();

    if (search) {
      data = data.filter(
        (payment) =>
          payment.memberName.toLowerCase().includes(search) ||
          payment.planName.toLowerCase().includes(search),
      );
    }

    if (this.statusFilter()) {
      data = data.filter((payment) => payment.status === this.statusFilter());
    }

    return data;
  });

  onAddPayment(): void {
    this.router.navigate(['/payments/create']);
  }

  onTableEvent(event: any): void {
    switch (event.action) {
      case 'view':
        this.viewPayment(event.row);
        break;

      case 'edit':
        this.editPayment(event.row);
        break;

      case 'delete':
        this.deletePayment(event.row);
        break;
    }
  }

  viewPayment(payment: Payment): void {
    this.router.navigate(['/payments', payment.id]);
  }

  editPayment(payment: Payment): void {
    this.router.navigate(['/payments', payment.id, 'edit']);
  }

  async deletePayment(payment: Payment): Promise<void> {
    const confirmed = await this.dialog
      .open(ConfirmDialogComponent, {
        width: '420px',

        data: {
          title: 'Delete Payment',

          message: `Delete payment of ₹${payment.amount}?`,

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
  }
}
