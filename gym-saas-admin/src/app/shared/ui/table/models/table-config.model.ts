import { TableAction } from './table-action.model';
import { TableColumn } from './table-column.model';

export interface TableConfig<T = any>{

  columns: TableColumn<T>[];

  actions?: TableAction[];

  pageSize?: number;

   pageSizeOptions?: number[];

    stickyHeader?: boolean;

    showPaginator?: boolean;

    selectable?: boolean;

    responsive?: boolean;

}

export interface TableActionEvent<T>{

  action:string;

  row:T;

}