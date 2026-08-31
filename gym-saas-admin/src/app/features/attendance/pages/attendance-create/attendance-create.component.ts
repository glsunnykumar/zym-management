import {
  Component,
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  PageLayoutComponent
} from '../../../../shared/ui/layout/page-layout/page-layout.component';

import {
  PageHeaderComponent
} from '../../../../shared/ui/layout/page-header/page-header.component';

import {
  AttendanceFormComponent
} from '../../components/attendance-form/attendance-form.component';

import {
  AttendanceService
} from '../../services/attendance.service';

@Component({
  selector: 'gf-attendance-create',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    AttendanceFormComponent
  ],
  templateUrl:
    './attendance-create.component.html',
  styleUrl:
    './attendance-create.component.scss'
})
export class AttendanceCreateComponent {

  private readonly attendanceService =
    inject(AttendanceService);

  private readonly router =
    inject(Router);

  async createAttendance(
    attendance: any
  ): Promise<void> {

    await this.attendanceService
      .addAttendance({

        ...attendance,

        createdAt:
          Date.now()

      });

    this.router.navigate([
      '/attendance'
    ]);

  }

  onCancel(): void {

    this.router.navigate([
      '/attendance'
    ]);

  }

}