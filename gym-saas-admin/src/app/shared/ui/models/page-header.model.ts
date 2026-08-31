export interface PageHeaderButton {

  text: string;

  icon?: string;

  color?: 'primary' | 'accent' | 'warn';

  visible?: boolean;

  disabled?: boolean;

}

export interface PageHeaderConfig {

  title: string;

  subtitle?: string;

  icon?: string;

  button?: PageHeaderButton;

}