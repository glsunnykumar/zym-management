export interface Attendance {

  id: string;

  memberId: string;

  date: string;

  checkInTime?: string;

  checkOutTime?: string;

  status:
    | 'present'
    | 'absent';

  notes?: string;

  createdAt: number;

}