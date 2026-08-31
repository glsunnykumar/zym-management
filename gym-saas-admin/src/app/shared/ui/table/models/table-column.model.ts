import { TemplateRef } from "@angular/core";

export type TableRenderer =
  | 'text'
  | 'status'
  | 'currency'
  | 'date'
  | 'boolean'
  | 'image'
  | 'avatar';

export interface TableColumn<T = any> {

   key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  renderer?: TableRenderer;
  hidden?: boolean;
  template?: TemplateRef<any>;

}