import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
  ) {}

  async getSettings(): Promise<any | null> {
    const docRef = doc(this.firestore, 'settings/app');

    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return snap.data();
    }

    return null;
  }

  // Upload logo and return URL
  async uploadLogo(gymId: string, file: File): Promise<string> {
    const path = `gym-logos/${gymId}`;
    const storageRef = ref(this.storage, path);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
  }

  // Save settings
  async saveSettings(gymId: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, `gyms/${gymId}`);
    console.log('Saving settings for gymId:', gymId, 'with data:', data);

    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
}
