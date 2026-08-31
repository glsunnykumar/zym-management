import { Component, computed, inject, signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';

import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { SearchToolbarComponent } from '../../../../shared/components/search-toolbar/search-toolbar.component';

import { DashboardGridComponent } from '../../../../shared/components/dashboard-grid/dashboard-grid.component';
import { DashboardItemComponent } from '../../../../shared/components/dashboard-item/dashboard-item.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { PaymentService } from '../../../payments/services/payment.service';
import { MemberService } from '../../../members/services/member.service';
import { PlanService } from '../../../plans/services/plan.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
//import { TableColumn } from '../../../../shared/ui/models';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { Member } from '../../../members/models/member.model';
import { RevenueReportRow } from './models/revenue.model';

@Component({
  selector: 'gf-revenue-report',
  standalone: true,

  imports: [
    
    PageLayoutComponent,
    PageHeaderComponent,

    SearchToolbarComponent,

    DataTableComponent,

    DashboardGridComponent,
    DashboardItemComponent,
    StatCardComponent,

    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
  ],

  templateUrl: './revenue-report.component.html',

  styleUrl: './revenue-report.component.scss',
})
export class RevenueReportComponent {
  private readonly paymentService = inject(PaymentService);

  private readonly memberService = inject(MemberService);

  private readonly planService = inject(PlanService);

  readonly payments = toSignal(this.paymentService.getPayments(), {
    initialValue: [],
  });

  readonly members = toSignal(this.memberService.getMembers(), {
    initialValue: [],
  });

  readonly plans = toSignal(this.planService.getPlans(), {
    initialValue: [],
  });

  readonly fromDate = signal<Date | null>(null);

  readonly toDate = signal<Date | null>(null);

  readonly methodFilter = signal('');

  readonly columns : readonly TableColumn<RevenueReportRow>[] = [

      {
    key: 'memberName',
    label: 'Member'
  },

  {
    key: 'planName',
    label: 'Plan'
  },

  {
    key: 'paymentDate',
    label: 'Date'
  },

  {
    key: 'amount',
    label: 'Amount'
  }

  ];

  readonly reportRows = computed(() => {
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

  readonly filteredRows = computed(() => {
    let rows = [...this.reportRows()];

    if (this.methodFilter()) {
      rows = rows.filter((row) => row.paymentMethod === this.methodFilter());
    }

    return rows;
  });

  readonly totalRevenue = computed(() => {
    return this.filteredRows().reduce(
      (sum, row) => sum + Number(row.amount),
      0,
    );
  });

  readonly totalPayments = computed(() => this.filteredRows().length);

  readonly averagePayment = computed(() => {
    const count = this.totalPayments();

    if (!count) {
      return 0;
    }

    return Math.round(this.totalRevenue() / count);
  });
}
