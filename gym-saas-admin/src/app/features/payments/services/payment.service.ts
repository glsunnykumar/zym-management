import {
  Injectable,
  inject
} from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly firestore =
    inject(Firestore);

  private readonly collectionName =
    'payments';

  getPayments(): Observable<Payment[]> {

    const ref = collection(
      this.firestore,
      this.collectionName
    );

    return collectionData(
      ref,
      {
        idField: 'id'
      }
    ) as Observable<Payment[]>;

  }

  async createPayment(
    payment: Omit<Payment, 'id'>
  ): Promise<void> {

    const ref = collection(
      this.firestore,
      this.collectionName
    );

    await addDoc(ref, payment);

  }

  async updatePayment(
    id: string,
    payment: Partial<Payment>
  ): Promise<void> {

    const ref = doc(
      this.firestore,
      this.collectionName,
      id
    );

    await updateDoc(ref, {
      ...payment
    });

  }

  async deletePayment(
    id: string
  ): Promise<void> {

    const ref = doc(
      this.firestore,
      this.collectionName,
      id
    );

    await deleteDoc(ref);

  }

  async getPaymentById(
    id: string
  ): Promise<Payment | null> {

    const ref = doc(
      this.firestore,
      this.collectionName,
      id
    );

    const snap =
      await getDoc(ref);

    if (!snap.exists()) {
      return null;
    }

    return {
      id: snap.id,
      ...snap.data()
    } as Payment;

  }

}