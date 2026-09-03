export interface AppNotification {

  id: string;

  memberId: string;

  memberName: string;

  type: 'membership-expiry';

  message: string;

  expiryDate: string;

  read: boolean;

  createdAt: number;

}