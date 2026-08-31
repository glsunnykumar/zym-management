import { Breadcrumb } from './breadcrumb.model';
import { PageAction } from './page-action.model';

export interface PageConfig {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: PageAction[];
}