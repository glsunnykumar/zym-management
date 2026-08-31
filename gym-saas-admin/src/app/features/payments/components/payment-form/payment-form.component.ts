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

import { Payment } from '../../models/payment.model';
import { Member } from '../../../members/models/member.model';
import { Plan } from '../../../plans/models/plan.model';

import { MemberService } from '../../../members/services/member.service';
import { PlanService } from '../../../plans/services/plan.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'gf-payment-form',
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
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent
  implements OnInit, OnChanges {

  private readonly fb =
    inject(FormBuilder);

  private readonly memberService =
    inject(MemberService);

  private readonly planService =
    inject(PlanService);

  @Input()
  payment: Payment | null = null;

  @Output()
  save =
    new EventEmitter<any>();

  @Output()
  cancel =
    new EventEmitter<void>();

  members: Member[] = [];

  plans: Plan[] = [];

  readonly form =
    this.fb.group({

      memberId: [
        '',
        Validators.required
      ],

      planId: [
        '',
        Validators.required
      ],

      amount: [
        0,
        Validators.required
      ],

      paymentDate:
        this.fb.control<Date | null>(
          null,
          Validators.required
        ),

      nextDueDate:
        this.fb.control<Date | null>(
          null,
          Validators.required
        ),

      paymentMethod: [
        'cash',
        Validators.required
      ],

      status: [
        'paid',
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

    this.planService
      .getPlans()
      .subscribe(plans => {

        this.plans = plans;

      });

    this.form
      .get('memberId')
      ?.valueChanges
      .subscribe(memberId => {

        const member =
          this.members.find(
            m => m.id === memberId
          );

        if (!member) {
          return;
        }

        this.form.patchValue({
          planId: member.planName
        });

        const plan =
          this.plans.find(
            p => p.id === member.planName
          );

        if (plan) {

          this.form.patchValue({
            amount: plan.price
          });

        }

      });

  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (!this.payment) {
      return;
    }

    this.form.patchValue({

      memberId:
        this.payment.memberId,

      planId:
        this.payment.planId,

      amount:
        this.payment.amount,

      paymentDate:
        this.payment.paymentDate
          ? new Date(
              this.payment.paymentDate
            )
          : null,

      nextDueDate:
        this.payment.nextDueDate
          ? new Date(
              this.payment.nextDueDate
            )
          : null,

      paymentMethod:
        this.payment.paymentMethod,

      status:
        this.payment.status,

      notes:
        this.payment.notes ?? ''

    });

  }

  submit(): void {

    if (
      this.form.invalid
    ) {
      return;
    }

    const value =
      this.form.getRawValue();

    this.save.emit({

      ...value,

      paymentDate:
        value.paymentDate
          ?.toISOString()
          .split('T')[0],

      nextDueDate:
        value.nextDueDate
          ?.toISOString()
          .split('T')[0]

    });

  }

  onCancel(): void {

    this.cancel.emit();

  }

}