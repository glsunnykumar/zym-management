import { inject, Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Member } from '../../../features/members/models/member.model';

import { AppNotification } from '../../models/notification.model';

export interface NotificationItem {

  id: string;

  title: string;

  message: string;

  type: 'warning' | 'info' | 'success';

  createdAt: number;

}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly snackBar =
    inject(MatSnackBar);

  private readonly firestore =
    inject(Firestore);

  // =========================
  // Firestore Notifications
  // =========================

  getNotifications(
    gymId: string
  ): Observable<AppNotification[]> {

    const notificationsRef =
      collection(
        this.firestore,
        `gyms/${gymId}/notifications`
      );

    return collectionData(
      notificationsRef,
      {
        idField: 'id'
      }
    ) as Observable<
      AppNotification[]
    >;

  }

  async createNotification(
    gymId: string,
    notification: AppNotification
  ): Promise<void> {

    await setDoc(

      doc(
        this.firestore,
        `notifications/${notification.id}`
      ),

      notification

    );

  }


  async markAsRead(
  id: string
): Promise<void> {

  await updateDoc(
    doc(
      this.firestore,
      `notifications/${id}`
    ),
    {
      read: true
    }
  );

}


  // =========================
  // Membership Expiry Logic
  // =========================

  getMembershipExpiryNotifications(
    members: Member[]
  ): NotificationItem[] {

    const today =
      new Date();

    const next7Days =
      new Date();

    next7Days.setDate(
      next7Days.getDate() + 7
    );

    return members

      .filter(member => {

        if (!member.expiryDate) {
          return false;
        }

        const expiry =
          new Date(member.expiryDate);

        return (
          expiry >= today &&
          expiry <= next7Days
        );

      })

      .map(member => {

        const days =
          this.daysRemaining(
            member.expiryDate
          );

        return {

          id: member.id,

          title: 'Membership Expiry',

          message:
            `${member.name} expires in ${days} day${days > 1 ? 's' : ''}`,

          type: 'warning',

          createdAt: Date.now()

        };

      });

  }

  daysRemaining(
    expiryDate: string
  ): number {

    const today =
      new Date();

    const expiry =
      new Date(expiryDate);

    const diff =
      expiry.getTime() -
      today.getTime();

    return Math.ceil(
      diff /
      (1000 * 60 * 60 * 24)
    );

  }

  // =========================
  // Toast Messages
  // =========================

  success(
    message: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        panelClass: [
          'success-snackbar'
        ]
      }
    );

  }

  error(
    message: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 5000,
        panelClass: [
          'error-snackbar'
        ]
      }
    );

  }

  warning(
    message: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 4000,
        panelClass: [
          'warning-snackbar'
        ]
      }
    );

  }

  info(
    message: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        panelClass: [
          'info-snackbar'
        ]
      }
    );

  }

}