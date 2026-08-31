export interface Plan {

  id: string;

  name: string;

  description?: string;

  durationDays: number;

  price: number;

  isActive: boolean;

  createdAt: number;

  updatedAt: number;

}