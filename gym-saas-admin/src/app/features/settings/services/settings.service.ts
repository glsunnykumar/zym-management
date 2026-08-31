import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  doc,
  docData,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';

import { AppSettings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly firestore = inject(Firestore);

  private readonly storage = inject(Storage);

  private readonly settingsRef = doc(this.firestore, 'settings/app');

  /**
   * Load settings
   */
  getSettings(): Observable<AppSettings> {
    return docData(this.settingsRef, {
    }) as Observable<AppSettings>;
  }

  async getSettingsOnce(): Promise<AppSettings | null> {
    const snapshot = await getDoc(this.settingsRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as AppSettings;

    return {
      ...data
    };
  }
  /**
   * Save settings
   */
  async saveSettings(settings: AppSettings): Promise<void> {
    await setDoc(
      this.settingsRef,
      {
        ...settings,

        updatedAt: Date.now(),
      },
      {
        merge: true,
      },
    );
  }

  /**
   * Upload gym logo
   */
  async uploadLogo(file: File): Promise<string> {
    const filePath = `settings/logo-${Date.now()}`;

    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
  }
}
