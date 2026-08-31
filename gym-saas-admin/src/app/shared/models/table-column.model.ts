export type TableColumnAlign =
  | 'start'
  | 'center'
  | 'end';

export type TableColumnPriority =
  | 'primary'
  | 'secondary'
  | 'optional';

export type TableColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'status';

export interface TableColumn<T> {

  key: keyof T & string;

  label: string;

  type?: TableColumnType;

  sortable?: boolean;

  width?: string;

  align?: TableColumnAlign;

  priority?: TableColumnPriority;

  /**
   * Allows feature pages to control how a value
   * is displayed without modifying DataTable.
   */
  formatter?: (
    value: unknown,
    row: T
  ) => string | number;

}