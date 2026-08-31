import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collectionData,
  getDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly firestore = inject(Firestore);

  private readonly collectionName = 'attendance';

  getAttendance(): Observable<Attendance[]> {
    const ref = collection(this.firestore, this.collectionName);

    return collectionData(ref, {
      idField: 'id',
    }) as Observable<Attendance[]>;
  }

  async addAttendance(attendance: Omit<Attendance, 'id'>): Promise<void> {
    const ref = collection(this.firestore, this.collectionName);

    await addDoc(ref, attendance);
  }

  async updateAttendance(
    id: string,
    attendance: Partial<Attendance>,
  ): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);

    await updateDoc(ref, attendance as any);
  }

  async deleteAttendance(id: string): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);

    await deleteDoc(ref);
  }

  async getAttendanceById(id: string): Promise<Attendance | null> {
    const ref = doc(this.firestore, this.collectionName, id);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as Omit<Attendance, 'id'>;

    return {
      ...data,
      id: snapshot.id,
    };
  }
}
