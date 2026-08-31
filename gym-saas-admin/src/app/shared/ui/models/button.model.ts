export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'text';

export type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg';


  export type ButtonStyle =
  | 'flat'
  | 'stroked'
  | 'raised'
  | 'icon'
  | 'fab';

export interface ButtonConfig {

  text: string;

  icon?: string;

  variant?: ButtonVariant;

  size?: ButtonSize;

  style?: ButtonStyle;

  fullWidth?: boolean;

  loading?: boolean;

  disabled?: boolean;

  type?: 'button' | 'submit' | 'reset';

}