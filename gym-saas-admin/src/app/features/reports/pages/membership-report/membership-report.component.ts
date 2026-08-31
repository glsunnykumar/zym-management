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
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { DashboardGridComponent } from '../../../../shared/components/dashboard-grid/dashboard-grid.component';
import { DashboardItemComponent } from '../../../../shared/components/dashboard-item/dashboard-item.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { MemberService } from '../../../members/services/member.service';
import { PlanService } from '../../../plans/services/plan.service';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { Member } from '../../../members/models/member.model';

@Component({
  selector: 'gf-membership-report',
  standalone: true,

  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    DataTableComponent,
    DashboardGridComponent,
    DashboardItemComponent,
    StatCardComponent,
  ],

  templateUrl: './membership-report.component.html',

  styleUrl: './membership-report.component.scss',
})
export class MembershipReportComponent {
  private readonly memberService = inject(MemberService);

  private readonly planService = inject(PlanService);

  readonly members = toSignal(this.memberService.getMembers(), {
    initialValue: [],
  });

  readonly plans = toSignal(this.planService.getPlans(), {
    initialValue: [],
  });

  readonly columns : readonly TableColumn<Member>[] = [
    {
      key: 'name',
      label: 'Member',
    },

    {
      key: 'phone',
      label: 'Phone',
    },

    {
      key: 'planName',
      label: 'Plan',
    },

    {
      key: 'joiningDate',
      label: 'Joined',
    },

    {
      key: 'expiryDate',
      label: 'Expiry',
    },
  ];

  readonly reportRows = computed(() => {
    return this.members().map((member) => {
      const plan = this.plans().find((p) => p.id === member.planId);

      const today = new Date();

      const expiry = new Date(member.expiryDate);

      const daysLeft = Math.ceil(
        (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      let membershipStatus = 'active';

      if (daysLeft < 0) {
        membershipStatus = 'expired';
      } else if (daysLeft <= 7) {
        membershipStatus = 'expiring';
      }

      return {
        ...member,

        planName: plan?.name ?? 'No Plan',

        daysLeft,

        membershipStatus,
      };
    });
  });

  readonly expiredMembers = computed(
    () =>
      this.reportRows().filter((m) => m.membershipStatus === 'expired').length,
  );

  readonly expiringSoon = computed(
    () =>
      this.reportRows().filter((m) => m.membershipStatus === 'expiring').length,
  );

  readonly activeMembers = computed(
    () =>
      this.reportRows().filter((m) => m.membershipStatus === 'active').length,
  );
}
