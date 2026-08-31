import { inject, Injectable } from '@angular/core';

import { Member } from '../models/member.model';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


   private readonly firestore =
    inject(Firestore);

  private readonly collectionName =
    'members';


async createMember(
  member: any
): Promise<void> {

  const id =
    crypto.randomUUID();

  await setDoc(
    doc(
      this.firestore,
      this.collectionName,
      id
    ),
    {
      ...member,

      id,

      status: 'active',

      createdAt: Date.now(),

      updatedAt: Date.now()
    }
  );
}


getMembers(): Observable<any[]> {

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
  ) as Observable<any[]>;
}


async getMemberById(
  id: string
): Promise<Member | null> {

  const snapshot =
    await getDoc(
      doc(
        this.firestore,
        'members',
        id
      )
    );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Member;

}



async updateMember(
  id: string,
  member: any
): Promise<void> {

  await updateDoc(
    doc(
      this.firestore,
      this.collectionName,
      id
    ),
    {
      ...member,
      updatedAt: Date.now()
    }
  );
}

async deleteMember(
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