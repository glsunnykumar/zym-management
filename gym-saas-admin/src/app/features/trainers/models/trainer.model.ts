export interface Trainer {

  id: string;

  fullName: string;

  email: string;

  phone: string;

  specialization: string;

  salary: number;

  joiningDate: string;

  status: 'active' | 'inactive';

  notes?: string;

  createdAt: number;
}