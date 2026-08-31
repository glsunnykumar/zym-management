export interface SelectOption<T = any> {

  label: string;

  value: T;

  icon?: string;

  disabled?: boolean;

}

export interface SelectFieldConfig {

  label: string;

  placeholder?: string;

  hint?: string;

  required?: boolean;

  searchable?: boolean;

  multiple?: boolean;

  options: SelectOption[];

}