export interface NavItem {
  label: string;

  icon: string;

  route: string;

  badge?: number;
  disabled?: boolean;
  visible?: boolean;

  children?: NavItem[];
}
