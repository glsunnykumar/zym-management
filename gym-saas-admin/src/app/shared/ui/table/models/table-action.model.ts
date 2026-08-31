import { TableActionType } from './table-action-type';

export interface TableAction {

  id: string;

  label: string;

  icon: string;

  color?: 'primary' | 'warn';

}