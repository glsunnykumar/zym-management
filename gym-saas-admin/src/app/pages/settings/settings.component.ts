import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  doc,
  Firestore,
  getDoc,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth/auth.service';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { SettingService } from '../../service/setting/setting.service';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  loading = false;
  gymId = '';
  selectedFile: File | null = null;
  logoPreview = '';
  form: FormGroup;
  private storage = inject(Storage);

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private authService: AuthService,
    private settingsService: SettingService,
  ) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      phone: [''],
      address: [''],
      logo: [''],

      // Payment Details
      upiId: [''],
      accountHolder: [''],
      bankName: [''],
      accountNumber: [''],
      ifsc: [''],
      razorpayKeyId: [''],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(async (user) => {
      if (!user) return;

      this.gymId = user.uid;
      await this.loadSettings();
    });
  }

  async loadSettings() {
    const data = await this.settingsService.getSettings(this.gymId);

    if (data) {
      this.form.patchValue(data);
      this.logoPreview = data.logo || '';
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async save() {
    if (!this.gymId) return;
    console.log('Saving settings for gymId:', this.gymId);

    this.loading = true;

    try {
      let logoUrl = this.form.value.logo || '';

      if (this.selectedFile) {
        logoUrl = await this.settingsService.uploadLogo(
          this.gymId,
          this.selectedFile,
        );
      }

      await this.settingsService.saveSettings(this.gymId, {
        ...this.form.value,
        logo: logoUrl,
      });

      this.form.patchValue({ logo: logoUrl });
      this.logoPreview = logoUrl;
    } finally {
      this.loading = false;
    }
  }
}
