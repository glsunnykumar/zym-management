import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private firestore: Firestore) {}

  getMembers(gymId: string): Observable<any[]> {
    const ref = collection(this.firestore, `gyms/${gymId}/members`);
    return collectionData(ref, { idField: 'id' });
  }

  addMember(gymId: string, data: any) {
    const ref = collection(this.firestore, `gyms/${gymId}/members`);

    return addDoc(ref, {
      ...data,
      createdAt: new Date(),
      status: 'active',
    });
  }

  updateMember(gymId: string, memberId: string, data: any) {
    const ref = doc(this.firestore, `gyms/${gymId}/members/${memberId}`);
    return updateDoc(ref, data);
  }

  deleteMember(gymId: string, memberId: string) {
    const ref = doc(this.firestore, `gyms/${gymId}/members/${memberId}`);
    return deleteDoc(ref);
  }
}
