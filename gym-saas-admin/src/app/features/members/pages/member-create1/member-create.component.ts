import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormActionsComponent } from '../../../../shared/ui/forms/form-actions/form-actions.component';
import { FormGridComponent } from '../../../../shared/ui/forms/form-grid/form-grid.component';
import { FormSectionComponent } from '../../../../shared/ui/forms/form-section/form-section.component';
import { FormCardComponent } from '../../../../shared/ui/forms/form-card/form-card.component';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'gf-member-create',
  imports: [
     ReactiveFormsModule,

    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,

    PageLayoutComponent,
    PageHeaderComponent,

    FormCardComponent,
    FormSectionComponent,
    FormGridComponent,
    FormActionsComponent
  ],
  templateUrl: './member-create.component.html',
  styleUrl: './member-create.component.scss',
    changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class MemberCreateComponent {


   private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);

readonly form =
    this.fb.nonNullable.group({

      name: ['', Validators.required],

      phone: ['', Validators.required],

      email: [''],

      gender: ['male'],

      planId: ['', Validators.required],

      joiningDate: ['', Validators.required],

      expiryDate: ['', Validators.required],

      emergencyContact: [''],

      notes: ['']

    });

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.getRawValue());

    this.router.navigate([
      '/members'
    ]);

  }

  cancel(): void {

    this.router.navigate([
      '/members'
    ]);

  }


}
