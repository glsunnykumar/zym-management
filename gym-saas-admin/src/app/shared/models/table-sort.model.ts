export type TableSortDirection = 'asc' | 'desc' | '';

export interface TableSort {
  active: string;
  direction: TableSortDirection;
}