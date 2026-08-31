export interface TableAction<T> {
  id: string;

  label: string;

  icon: string;

  color?: 'primary' | 'accent' | 'warn';

  visible?: (row: T) => boolean;

  disabled?: (row: T) => boolean;
}