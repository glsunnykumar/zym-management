export type EmptyStateVariant =
  | 'default'
  | 'search'
  | 'error';

export interface EmptyStateConfig {

  title: string;

  description: string;

  image?: string;

  icon?: string;

  buttonText?: string;

  showButton?: boolean;

  variant?: EmptyStateVariant;

}