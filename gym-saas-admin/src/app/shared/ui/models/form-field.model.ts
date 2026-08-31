export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'phone'
  | 'date'
  | 'textarea';

export interface FormFieldConfig {

  label: string;

  placeholder?: string;

  type?: FormFieldType;

  appearance?: 'outline' | 'fill';

  hint?: string;

  prefixIcon?: string;

  suffixIcon?: string;

  required?: boolean;

  readonly?: boolean;

  disabled?: boolean;

  maxlength?: number;

}