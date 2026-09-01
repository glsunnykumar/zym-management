import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatDatepickerModule
} from '@angular/material/datepicker';

import {
  MatNativeDateModule
} from '@angular/material/core';

import {
  MatButtonModule
} from '@angular/material/button';

import { Trainer } from '../../models/trainer.model';
import { FormCardComponent } from "../../../../shared/ui/forms/form-card/form-card.component";
import { FormSectionComponent } from "../../../../shared/ui/forms/form-section/form-section.component";
import { FormGridComponent } from "../../../../shared/ui/forms/form-grid/form-grid.component";
import { FormActionsComponent } from "../../../../shared/ui/forms/form-actions/form-actions.component";

@Component({
  selector: 'gf-trainer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormCardComponent,
    FormSectionComponent,
    FormGridComponent,
    FormActionsComponent
],
  templateUrl: './trainer-form.component.html',
  styleUrl: './trainer-form.component.scss'
})
export class TrainerFormComponent implements OnInit {

  private readonly fb =
    inject(FormBuilder);

  @Input()
  trainer?: Trainer;

  @Output()
  save =
    new EventEmitter<any>();

  @Output()
  cancel =
    new EventEmitter<void>();

  readonly form =
    this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        Validators.required
      ],

      specialization: [
        '',
        Validators.required
      ],

      salary: [
        0,
        Validators.required
      ],

      joiningDate:
        this.fb.control<Date | null>(
          null,
          Validators.required
        ),

      status: [
        'active',
        Validators.required
      ],

      notes: ['']

    });

  ngOnInit(): void {

    if (!this.trainer) {
      return;
    }

    this.form.patchValue({

      ...this.trainer,

      joiningDate:
        new Date(
          this.trainer.joiningDate
        )

    });

  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value =
      this.form.getRawValue();

    this.save.emit({

      ...value,

      joiningDate:
        value.joiningDate
          ?.toISOString()
          .split('T')[0]

    });

  }

}