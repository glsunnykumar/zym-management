import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import { toSignal }
from '@angular/core/rxjs-interop';

import { AttendanceService }
from '../../services/attendance.service';

import { MemberService }
from '../../../members/services/member.service';

import { Attendance }
from '../../models/attendance.model';

import { Member }
from '../../../members/models/member.model';

import { TableColumn }
from '../../../../shared/models/table-column.model';

import { TableAction }
from '../../../../shared/models/table-action.model';

import { PageLayoutComponent }
from '../../../../shared/ui/layout/page-layout/page-layout.component';

import { PageHeaderComponent }
from '../../../../shared/ui/layout/page-header/page-header.component';

import { SearchToolbarComponent }
from '../../../../shared/components/search-toolbar/search-toolbar.component';

import { DataTableComponent }
from '../../../../shared/components/data-table/data-table.component';

import { ConfirmDialogComponent }
from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

import { MatDialog }
from '@angular/material/dialog';

import {
  MatFormField,
  MatLabel
} from '@angular/material/form-field';

import {
  MatSelect,
  MatOption
} from '@angular/material/select';

import { MatInputModule }
from '@angular/material/input';

import { FormsModule }
from '@angular/forms';

import { MatButtonModule }
from '@angular/material/button';

@Component({
  selector: 'gf-attendance-list',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    SearchToolbarComponent,
    DataTableComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl:
    './attendance-list.component.html',
  styleUrl:
    './attendance-list.component.scss'
})
export class AttendanceListComponent {

  private readonly attendanceService =
    inject(AttendanceService);

  private readonly memberService =
    inject(MemberService);

  private readonly router =
    inject(Router);

  private readonly dialog =
    inject(MatDialog);

  readonly attendance =
    toSignal(
      this.attendanceService
        .getAttendance(),
      {
        initialValue: []
      }
    );

  readonly members =
    toSignal(
      this.memberService
        .getMembers(),
      {
        initialValue: []
      }
    );

  readonly search =
    signal('');

  readonly statusFilter =
    signal('');

  readonly columns:
    readonly TableColumn<any>[] = [

    {
      key: 'memberName',
      label: 'Member',
      sortable: true
    },

    {
      key: 'date',
      label: 'Date'
    },

    {
      key: 'checkInTime',
      label: 'Check In'
    },

    {
      key: 'checkOutTime',
      label: 'Check Out'
    },

    {
      key: 'status',
      label: 'Status',
      type: 'status'
    }

  ];

  readonly actions:
    readonly TableAction<any>[] = [

    {
      id: 'view',
      icon: 'visibility',
      label: 'View'
    },

    {
      id: 'edit',
      icon: 'edit',
      label: 'Edit'
    },

    {
      id: 'delete',
      icon: 'delete',
      label: 'Delete'
    }

  ];

  readonly attendanceVm =
    computed(() => {

      return this
        .attendance()
        .map(record => {

          const member =
            this.members()
              .find(
                m =>
                  m.id ===
                  record.memberId
              );

          return {

            ...record,

            memberName:
              member?.name ??
              'Unknown'

          };

        });

    });

  readonly filteredAttendance =
    computed(() => {

      let data =
        [...this.attendanceVm()];

      const search =
        this.search()
          .toLowerCase();

      if (search) {

        data =
          data.filter(
            item =>
              item.memberName
                .toLowerCase()
                .includes(search)
          );

      }

      if (
        this.statusFilter()
      ) {

        data =
          data.filter(
            item =>
              item.status ===
              this.statusFilter()
          );

      }

      return data;

    });

  onAddAttendance(): void {

    this.router.navigate([
      '/attendance/create'
    ]);

  }

  onTableEvent(
    event: any
  ): void {

    switch (
      event.action
    ) {

      case 'view':
        this.router.navigate([
          '/attendance',
          event.row.id
        ]);
        break;

      case 'edit':
        this.router.navigate([
          '/attendance',
          event.row.id,
          'edit'
        ]);
        break;

      case 'delete':
        this.deleteAttendance(
          event.row
        );
        break;

    }

  }

  async deleteAttendance(
    attendance: Attendance
  ): Promise<void> {

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
                'Delete this attendance record?',

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

  }

}