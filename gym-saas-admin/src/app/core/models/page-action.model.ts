export interface PageAction {

  id: string;

  label: string;

  icon?: string;

  color?: 'primary' | 'accent' | 'warn';

  disabled?: boolean;

}