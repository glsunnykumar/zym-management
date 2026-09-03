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
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartType } from 'chart.js';
import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'gf-dashboard-page',
  imports: [
    MatButtonModule,
    CommonModule,

    PageLayoutComponent,
    PageHeaderComponent,

    DashboardSectionComponent,
    DashboardGridComponent,
    DashboardItemComponent,
    BaseChartDirective,

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

  private readonly notificationService = inject(NotificationService);

  readonly stats = signal({
    totalMembers: 0,

    activeMembers: 0,

    totalPlans: 0,

    todayAttendance: 0,

    monthlyRevenue: 0,

    pendingPayments: 0,
  });

  readonly recentMembers = signal<any[]>([]);

  readonly recentAttendance = signal<any[]>([]);

  readonly expiringMembers = signal<any[]>([]);

  readonly revenueChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        tension: 0.4,
        fill: true,
      },
    ],
  });

  readonly revenueChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
    ]).subscribe(async ([members, plans, payments, attendance]) => {
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

      // Recent Members

      this.recentMembers.set(
        [...members]
          .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
          .slice(0, 5),
      );

      // Recent Attendance

      this.recentAttendance.set(
        [...attendance]
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 10),
      );
      // Expiring Members

      const todayDate = new Date();

      const next7Days = new Date();

      next7Days.setDate(next7Days.getDate() + 7);

      this.expiringMembers.set(
  members.filter((member) => {
    if (!member.expiryDate) {
      return false;
    }

    const expiryDate = new Date(member.expiryDate);

    const isAfterToday = expiryDate >= todayDate;
    const isBeforeNext7Days = expiryDate <= next7Days;

    console.log({
      name: member.name,
      expiryDate,
      todayDate,
      next7Days,
      isAfterToday,
      isBeforeNext7Days,
      FINAL: isAfterToday && isBeforeNext7Days
    });

    return isAfterToday && isBeforeNext7Days;
  })
);

console.log('FINAL EXPIRING MEMBERS:', this.expiringMembers());
     
      for (const member of members) {
        if (!member.expiryDate) {
          continue;
        }
       
        const expiryDate = new Date(member.expiryDate);
        const today = new Date();

        const diffDays = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffDays >= 0 && diffDays <= 7) {
          await this.notificationService.createNotification('1',{
            id: `expiry-${member.id}`,
            memberId: member.id,
            memberName: member.name,
            type: 'membership-expiry',
            message: `${member.name} expires in ${diffDays} days`,
            expiryDate: member.expiryDate,
            read: false,
            createdAt: Date.now(),
          });
        }
      }

      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();

        d.setDate(d.getDate() - (29 - i));

        return d;
      });

      const labels = last30Days.map((d) =>
        d.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        }),
      );

      const values = last30Days.map((date) => {
        const day = date.toISOString().split('T')[0];

        return payments
          .filter((p) => p.paymentDate === day)
          .reduce((sum, p) => sum + p.amount, 0);
      });

      this.revenueChartData.set({
        labels,

        datasets: [
          {
            label: 'Revenue',

            data: values,

            tension: 0.4,

            fill: true,
          },
        ],
      });
    });
  }
}
