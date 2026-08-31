export type StatusColor =
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'primary'
  | 'default';

export interface StatusChipConfig {

  label: string;

  color: StatusColor;

  icon?: string;

}

