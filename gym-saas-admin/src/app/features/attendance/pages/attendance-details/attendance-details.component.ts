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

import { firstValueFrom } from 'rxjs';

import { MatButtonModule }
from '@angular/material/button';

import { MatDialog }
from '@angular/material/dialog';

import {
  PageLayoutComponent
} from '../../../../shared/ui/layout/page-layout/page-layout.component';

import {
  PageHeaderComponent
} from '../../../../shared/ui/layout/page-header/page-header.component';

import {
  ConfirmDialogComponent
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

import {
  AttendanceService
} from '../../services/attendance.service';

import {
  MemberService
} from '../../../members/services/member.service';

import {
  Attendance
} from '../../models/attendance.model';

import {
  Member
} from '../../../members/models/member.model';

@Component({
  selector: 'gf-attendance-details',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    MatButtonModule
  ],
  templateUrl:
    './attendance-details.component.html',
  styleUrl:
    './attendance-details.component.scss'
})
export class AttendanceDetailsComponent
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly dialog =
    inject(MatDialog);

  private readonly attendanceService =
    inject(AttendanceService);

  private readonly memberService =
    inject(MemberService);

  readonly attendance =
    signal<Attendance | null>(null);

  readonly member =
    signal<Member | null>(null);

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

    const members =
      await firstValueFrom(
        this.memberService
          .getMembers()
      );

    const member =
      members.find(
        m =>
          m.id ===
          attendance.memberId
      );

    this.member.set(
      member ?? null
    );

  }

  editAttendance(): void {

    const attendance =
      this.attendance();

    if (!attendance) {
      return;
    }

    this.router.navigate([
      '/attendance',
      attendance.id,
      'edit'
    ]);

  }

  async deleteAttendance():
  Promise<void> {

    const attendance =
      this.attendance();

    if (!attendance) {
      return;
    }

    const confirmed =
      await this.dialog
        .open(
          ConfirmDialogComponent,
          {
            width: '420px',

            data: {

              title:
                'Delete Attendance',

              message:
                'Are you sure you want to delete this attendance record?',

              confirmText:
                'Delete',

              cancelText:
                'Cancel'

            }
          }
        )
        .afterClosed()
        .toPromise();

    if (!confirmed) {
      return;
    }

    await this
      .attendanceService
      .deleteAttendance(
        attendance.id
      );

    this.router.navigate([
      '/attendance'
    ]);

  }

}