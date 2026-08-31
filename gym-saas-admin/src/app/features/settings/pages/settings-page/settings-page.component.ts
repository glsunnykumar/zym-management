import { Component, inject, OnInit, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';

import { SettingsService } from '../../services/settings.service';

import { AppSettings } from '../../models/settings.model';

import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';

import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'gf-settings-page',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,

    PageLayoutComponent,
    PageHeaderComponent,
  ],

  templateUrl: './settings-page.component.html',

  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly settingsService = inject(SettingsService);

  private readonly snackBar = inject(MatSnackBar);

  readonly loading = signal(false);

  readonly logoPreview = signal('');

  selectedLogo?: File;

  readonly form = this.fb.group({
    gymName: ['', Validators.required],

    ownerName: [''],

    email: [''],

    phone: [''],

    address: [''],

    currency: ['INR', Validators.required],

    theme: ['light'],

    logoUrl: [''],
  });

  async ngOnInit(): Promise<void> {
    this.settingsService.getSettings().subscribe((settings) => {
      if (!settings) {
        return;
      }

      this.form.patchValue(settings);

      this.logoPreview.set(settings.logoUrl ?? '');
    });
  }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
      return;
    }

    this.selectedLogo = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.logoPreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    try {
      let logoUrl = this.form.value.logoUrl ?? '';

      if (this.selectedLogo) {
        logoUrl = await this.settingsService.uploadLogo(this.selectedLogo);
      }

      const settings: AppSettings = {
        gymName: this.form.value.gymName ?? '',

        ownerName: this.form.value.ownerName ?? '',

        email: this.form.value.email ?? '',

        phone: this.form.value.phone ?? '',

        address: this.form.value.address ?? '',

        currency: this.form.value.currency ?? 'INR',

        theme: (this.form.value.theme ?? 'light') as 'light' | 'dark',

        logoUrl,

        updatedAt: Date.now(),
      };

      await this.settingsService.saveSettings(settings);

      this.snackBar.open('Settings saved successfully', 'Close', {
        duration: 3000,
      });
    } finally {
      this.loading.set(false);
    }
  }
}
