export type LoadingVariant =
  | 'fullscreen'
  | 'section'
  | 'inline'
  | 'card';

export interface LoadingConfig {

  message?: string;

  variant?: LoadingVariant;

  showLogo?: boolean;

  backdrop?: boolean;

}