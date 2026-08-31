import { ToolbarFilter } from "./toolbarfiltermodel";

export interface SearchToolbarConfig {

  title?: string;

  placeholder: string;

  addButtonText?: string;

  addButtonIcon?: string;

  showSearch?: boolean;

  showAdd?: boolean;

  showRefresh?: boolean;

  showExport?: boolean;

  showFilter?: boolean;

  filters?: ToolbarFilter[];

}