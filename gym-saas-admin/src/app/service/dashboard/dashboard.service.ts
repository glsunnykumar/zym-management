import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   constructor(private firestore: Firestore) {}

  getMembers(gymId: string): Observable<any[]> {
    const ref = collection(this.firestore, `gyms/${gymId}/members`);
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  getPlans(gymId: string): Observable<any[]> {
    const ref = collection(this.firestore, `gyms/${gymId}/plans`);
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }
}
