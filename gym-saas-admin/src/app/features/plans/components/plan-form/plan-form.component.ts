import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Plan } from '../../models/plan.model';

@Component({
  selector: 'gf-plan-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanFormComponent {
  private readonly fb = inject(FormBuilder);

  @Input()
  set plan(value: Plan | null) {
    if (!value) {
      return;
    }

    this.form.patchValue({
      name: value.name,
      description: value.description,
      durationDays: value.durationDays,
      price: value.price,
      isActive: value.isActive,
    });
  }

  @Output()
  save = new EventEmitter<any>();

  @Output()
  readonly cancel = new EventEmitter<void>();

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],

    description: [''],

    durationDays: [30, [Validators.required, Validators.min(1)]],

    price: [0, [Validators.required, Validators.min(0)]],

    isActive: [true],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.save.emit(this.form.getRawValue());
  }

  onCancel(): void {

    console.log('FORM CANCEL');

    this.cancel.emit();
  }
}
