export type CardAppearance =
  | 'outlined'
  | 'filled'
  | 'elevated';

export interface CardConfig {

  title?: string;

  subtitle?: string;

  icon?: string;

  elevated?: boolean;

  padding?: 'none' | 'sm' | 'md' | 'lg';

  showDivider?: boolean;

  appearance?: CardAppearance;

}