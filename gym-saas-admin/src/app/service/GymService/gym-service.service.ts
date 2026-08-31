import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class GymService {

  constructor(private firestore: Firestore) {}

  createGym(userId: string, gymName: string) {
    const gymRef = doc(this.firestore, `gyms/${userId}`);
    return setDoc(gymRef, {
      name: gymName,
      ownerId: userId,
      createdAt: new Date(),
      plan: 'trial'
    });
  }
}