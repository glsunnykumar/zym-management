import {
  Injectable,
  inject
} from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private readonly firestore =
    inject(Firestore);

  private readonly collectionName =
    'plans';

  getPlans(): Observable<Plan[]> {

    const ref = collection(
      this.firestore,
      this.collectionName
    );

    return collectionData(
      ref,
      {
        idField: 'id'
      }
    ) as Observable<Plan[]>;

  }

  async getPlanById(
    id: string
  ): Promise<Plan | null> {

    const snapshot =
      await getDoc(
        doc(
          this.firestore,
          this.collectionName,
          id
        )
      );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Plan;

  }

  async createPlan(
    plan: Omit<Plan, 'id'>
  ): Promise<void> {

    await addDoc(
      collection(
        this.firestore,
        this.collectionName
      ),
      plan
    );

  }

  async updatePlan(
    id: string,
    plan: Partial<Plan>
  ): Promise<void> {

    await updateDoc(
      doc(
        this.firestore,
        this.collectionName,
        id
      ),
      plan
    );

  }

  async deletePlan(
    id: string
  ): Promise<void> {

    await deleteDoc(
      doc(
        this.firestore,
        this.collectionName,
        id
      )
    );

  }

}