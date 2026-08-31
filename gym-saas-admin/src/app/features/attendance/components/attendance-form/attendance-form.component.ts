import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit, 
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Attendance }
from '../../models/attendance.model';

import { Member }
from '../../../members/models/member.model';

import { MemberService }
from '../../../members/services/member.service';

import { MatFormFieldModule }
from '@angular/material/form-field';

import { MatInputModule }
from '@angular/material/input';

import { MatSelectModule }
from '@angular/material/select';

import { MatButtonModule }
from '@angular/material/button';

import { MatDatepickerModule }
from '@angular/material/datepicker';

import { MatNativeDateModule }
from '@angular/material/core';

@Component({
  selector: 'gf-attendance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl:
    './attendance-form.component.html',
  styleUrl:
    './attendance-form.component.scss'
})
export class AttendanceFormComponent
implements OnInit, OnChanges {

  private readonly fb =
    inject(FormBuilder);

  private readonly memberService =
    inject(MemberService);

  @Input()
  attendance:
    Attendance | null = null;

  @Output()
  save =
    new EventEmitter<any>();

  @Output()
  cancel =
    new EventEmitter<void>();

  members: Member[] = [];

  readonly form =
    this.fb.group({

      memberId: [
        '',
        Validators.required
      ],

      date:
        this.fb.control<Date | null>(
          new Date(),
          Validators.required
        ),

      checkInTime: [
        '',
        Validators.required
      ],

      checkOutTime: [''],

      status: [
        'present',
        Validators.required
      ],

      notes: ['']

    });

  ngOnInit(): void {

    this.memberService
      .getMembers()
      .subscribe(members => {

        this.members = members;

      });

  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (!this.attendance) {
      return;
    }

    this.form.patchValue({

      memberId:
        this.attendance.memberId,

      date:
        new Date(
          this.attendance.date
        ),

      checkInTime:
        this.attendance.checkInTime,

      checkOutTime:
        this.attendance.checkOutTime,

      status:
        this.attendance.status,

      notes:
        this.attendance.notes ?? ''

    });

  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    const value =
      this.form.getRawValue();

    this.save.emit({

      ...value,

      date:
        value.date
          ?.toISOString()
          .split('T')[0]

    });

  }

  onCancel(): void {

    this.cancel.emit();

  }

}