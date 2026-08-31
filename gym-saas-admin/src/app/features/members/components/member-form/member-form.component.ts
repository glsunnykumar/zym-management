import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormCardComponent } from '../../../../shared/ui/forms/form-card/form-card.component';
import { FormSectionComponent } from '../../../../shared/ui/forms/form-section/form-section.component';
import { FormGridComponent } from '../../../../shared/ui/forms/form-grid/form-grid.component';
import { FormActionsComponent } from '../../../../shared/ui/forms/form-actions/form-actions.component';
import { PlanService } from '../../../plans/services/plan.service';
import { Plan } from '../../../plans/models/plan.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-member-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,

    FormCardComponent,
    FormSectionComponent,
    FormGridComponent,
    FormActionsComponent,
  ],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly submitLabel = input('Save Member');

  readonly member = input<any | null>(null);

  readonly plans = signal<Plan[]>([]);

  private readonly planService = inject(PlanService);

  @Output()
  readonly save = new EventEmitter<any>();

  @Output()
  readonly cancel = new EventEmitter<void>();

  ngOnInit(): void {
    this.planService.getPlans().subscribe((plans) => {
      console.log('Plans fetched:', plans);
      this.plans.set(plans);
    });
  }

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],

    phone: ['', Validators.required],

    email: [''],

    gender: ['male'],

    planId: ['', Validators.required],

    joiningDate: ['', Validators.required],

    expiryDate: ['', Validators.required],

    emergencyContact: [''],

    notes: [''],
  });

  constructor() {
    effect(() => {
      const member = this.member();

      if (!member) {
        return;
      }

      this.form.patchValue({
        name: member.name ?? '',
        phone: member.phone ?? '',
        email: member.email ?? '',
        gender: member.gender ?? 'male',
        planId: member.planId ?? '',
        joiningDate: member.joiningDate ?? '',
        expiryDate: member.expiryDate ?? '',
        emergencyContact: member.emergencyContact ?? '',
        notes: member.notes ?? '',
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.save.emit(this.form.getRawValue());
  }
}
