export type StatCardColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface StatCardConfig {

  /** Card Title */
  title: string;

  /** Main Value */
  value: number | string;

  /** Material Icon */
  icon: string;

  /** Theme Color */
  color?: StatCardColor;

   trend?: {
    value: number;
    positive: boolean;
  };

  /** Percentage Change */
  change?: number;

  /** Small description */
  description?: string;

  /** Loading State */
  loading?: boolean;

  /** Clickable Card */
  clickable?: boolean;

}