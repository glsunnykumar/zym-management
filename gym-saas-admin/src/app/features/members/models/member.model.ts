export type MemberStatus =
  | 'active'
  | 'expired'
  | 'pending';

export interface Member {
   id: string;

  name: string;

  phone: string;

  email?: string;

  address?: string;

  gender?: 'male' | 'female' | 'other';

  dateOfBirth?: string;

  emergencyContact?: string;

  planName: string;

  status: MemberStatus;

  joiningDate: string;

  expiryDate: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}