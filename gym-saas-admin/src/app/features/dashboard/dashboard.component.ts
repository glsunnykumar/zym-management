import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutComponent } from '../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../shared/ui/layout/page-header/page-header.component';
import { DashboardSectionComponent } from '../../shared/components/dashboard-section/dashboard-section.component';
import { DashboardGridComponent } from '../../shared/components/dashboard-grid/dashboard-grid.component';
import { DashboardItemComponent } from '../../shared/components/dashboard-item/dashboard-item.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { PlanService } from '../plans/services/plan.service';
import { PaymentService } from '../payments/services/payment.service';
import { AttendanceService } from '../attendance/services/attendance.service';
import { MemberService } from '../members/services/member.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'gf-dashboard-page',
  imports: [
    MatButtonModule,

    PageLayoutComponent,
    PageHeaderComponent,

    DashboardSectionComponent,
    DashboardGridComponent,
    DashboardItemComponent,

    StatCardComponent,
    AppCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly navigation = inject(NavigationService);

  private readonly memberService = inject(MemberService);

  private readonly planService = inject(PlanService);

  private readonly paymentService = inject(PaymentService);

  private readonly attendanceService = inject(AttendanceService);

  readonly stats = signal({
    totalMembers: 0,

    activeMembers: 0,

    totalPlans: 0,

    todayAttendance: 0,

    monthlyRevenue: 0,

    pendingPayments: 0,
  });

  constructor() {
    this.navigation.configure({
      title: 'Dashboard',

      subtitle: 'Welcome back! Here is your gym overview.',
    });

    combineLatest([
      this.memberService.getMembers(),

      this.planService.getPlans(),

      this.paymentService.getPayments(),

      this.attendanceService.getAttendance(),
    ]).subscribe(([members, plans, payments, attendance]) => {
      const today = new Date().toISOString().split('T')[0];

      const currentMonth = today.substring(0, 7);

      this.stats.set({
        totalMembers: members.length,

        activeMembers: members.filter((m) => m.status === 'active').length,

        totalPlans: plans.length,

        todayAttendance: attendance.filter((a) => a.date === today).length,

        monthlyRevenue: payments
          .filter((p) => p.paymentDate?.startsWith(currentMonth))
          .reduce((sum, p) => sum + p.amount, 0),

        pendingPayments: payments.filter((p) => p.status !== 'paid').length,
      });
    });
  }
}
