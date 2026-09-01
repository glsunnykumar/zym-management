import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Trainer } from "../models/trainer.model";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private readonly firestore =
    inject(Firestore);

  private readonly collectionName =
    'trainers';

  getTrainers(): Observable<Trainer[]> {

    const ref =
      collection(
        this.firestore,
        this.collectionName
      );

    return collectionData(
      ref,
      {
        idField: 'id'
      }
    ) as Observable<Trainer[]>;
  }

  async getTrainerById(
  id: string
): Promise<Trainer | null> {

  const ref = doc(
    this.firestore,
    `${this.collectionName}/${id}`
  );

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...(snap.data() as Omit<Trainer, 'id'>)
  };

}

async createTrainer(
  trainer: any
): Promise<void> {

  await addDoc(
    collection(
      this.firestore,
      this.collectionName
    ),
    trainer
  );

}

  async updateTrainer(
    id: string,
    trainer: Partial<Trainer>
  ): Promise<void> {

    await updateDoc(
      doc(
        this.firestore,
        `${this.collectionName}/${id}`
      ),
      trainer
    );
  }

  async deleteTrainer(
    id: string
  ): Promise<void> {

    await deleteDoc(
      doc(
        this.firestore,
        `${this.collectionName}/${id}`
      )
    );
  }

}