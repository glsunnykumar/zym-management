export interface Payment {

  id: string;

  memberId: string;

  memberName: string;

  planId: string;

  planName: string;

  amount: number;

  paymentDate: string;

  nextDueDate: string;

  paymentMethod:
    | 'cash'
    | 'upi'
    | 'card';

  status:
    | 'paid'
    | 'pending'
    | 'overdue';

  notes?: string;

  createdAt: number;

}