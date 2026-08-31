import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
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

import {
  Attendance
} from '../../models/attendance.model';

@Component({
  selector: 'gf-attendance-edit',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    AttendanceFormComponent
  ],
  templateUrl:
    './attendance-edit.component.html',
  styleUrl:
    './attendance-edit.component.scss'
})
export class AttendanceEditComponent
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly attendanceService =
    inject(AttendanceService);

  readonly attendance =
    signal<Attendance | null>(null);

  async ngOnInit(): Promise<void> {

    const id =
      this.route.snapshot
        .paramMap
        .get('id');

    if (!id) {
      return;
    }

    const attendance =
      await this.attendanceService
        .getAttendanceById(id);

    if (!attendance) {
      return;
    }

    this.attendance.set(
      attendance
    );

  }

  async updateAttendance(
    value: any
  ): Promise<void> {

    const attendance =
      this.attendance();

    if (!attendance) {
      return;
    }

    await this.attendanceService
      .updateAttendance(
        attendance.id,
        value
      );

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