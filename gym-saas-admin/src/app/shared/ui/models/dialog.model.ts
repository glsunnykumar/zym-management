export interface DialogAction {

  text: string;

  icon?: string;

  color?: 'primary' | 'accent' | 'warn';

  disabled?: boolean;

}

export interface DialogConfig {

  title: string;

  subtitle?: string;

  icon: string;

  showClose?: boolean;

  primaryAction?: DialogAction;

  secondaryAction?: DialogAction;

}