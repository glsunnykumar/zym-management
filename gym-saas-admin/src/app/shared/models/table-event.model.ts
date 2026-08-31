import { TablePage } from './table-page.model';
import { TableSort } from './table-sort.model';

export type TableEvent<T> =
  | {
      type: 'rowClick';
      row: T;
    }
  | {
      type: 'action';
      action: string;
      row: T;
    }
  | {
      type: 'sort';
      sort: TableSort;
    }
  | {
      type: 'page';
      page: TablePage;
    }
  | {
      type: 'selection';
      rows: T[];
    };