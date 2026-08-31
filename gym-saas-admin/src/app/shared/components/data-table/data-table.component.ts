import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TableEvent } from '../../models/table-event.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableAction } from '../../models/table-action.model';
import { TableSort, TableSortDirection } from '../../models/table-sort.model';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { EmptyStateComponent } from '../../ui/feedback/empty-state/empty-state.component';
import { StatusType } from '../../models/status.model';

@Component({
  selector: 'gf-data-table',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,

    StatusChipComponent,
    EmptyStateComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T extends object> {
  readonly columns = input.required<readonly TableColumn<T>[]>();

  /**
   * Rows displayed by the table.
   */
  readonly rows = input.required<readonly T[]>();

  /* =====================================================
     STATE
     ===================================================== */

  readonly loading = input(false);

  readonly rowClickable = input(true);

  readonly selectable = input(false);

  readonly stickyHeader = input(true);

  /* =====================================================
     EMPTY STATE
     ===================================================== */

  readonly emptyTitle = input('No records found');

  readonly emptyMessage = input('There is currently no data to display.');

  readonly emptyIcon = input('inbox');

  /*
   * =========================================================
   * Actions
   * =========================================================
   */

  readonly actions = input<readonly TableAction<T>[]>([]);

  /**
   * Accessible table label.
   */
  readonly ariaLabel = input('Data table');

  /*
   * =========================================================
   * Pagination
   * =========================================================
   */

  readonly total = input(0);

  readonly pageIndex = input(0);

  readonly pageSize = input(10);

  readonly pageSizeOptions = input<readonly number[]>([10, 25, 50, 100]);

  readonly showPaginator = input(true);

  /**
   * Single event channel for all table interactions.
   */
  readonly tableEvent = output<TableEvent<T>>();

  /* =====================================================
     ROW IDENTITY
     ===================================================== */

  readonly rowKey = input<keyof T & string>('id' as keyof T & string);

  /*
   * =========================================================
   * Internal sorting state
   * =========================================================
   */

  protected readonly activeSort = signal<string>('');

  protected readonly sortDirection = signal<TableSortDirection>('');

  /*
   * =========================================================
   * Derived state
   * =========================================================
   */

  protected readonly hasActions = computed(() => this.actions().length > 0);

  protected readonly effectiveTotal = computed(
    () => this.total() || this.rows().length,
  );

  protected readonly hasRows = computed(() => this.rows().length > 0);

  protected readonly allRowsSelected = computed(() => {
    const rows = this.rows();

    if (!rows.length) {
      return false;
    }

    return rows.every((row) => this.isSelected(row));
  });

  protected readonly partiallySelected = computed(() => {
    const rows = this.rows();

    const selectedCount = rows.filter((row) => this.isSelected(row)).length;

    return selectedCount > 0 && selectedCount < rows.length;
  });

  /* =====================================================
     ROW IDENTITY
     ===================================================== */

  protected getRowId(row: T): unknown {
    return row[this.rowKey()];
  }

  /* =====================================================
     CELL VALUES
     ===================================================== */

  protected getFormattedValue(row: T, column: TableColumn<T>): string | number {
    const value = this.getCellValue(row, column);

    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (value === null || value === undefined || value === '') {
      return '—';
    }

    return String(value);
  }

  protected getStatus(row: T, column: TableColumn<T>): StatusType {
    const value = this.getCellValue(row, column);

    return String(value).toLowerCase() as StatusType;
  }

  /* =====================================================
     SELECTION
     ===================================================== */

  protected readonly selectedRows = signal<T[]>([]);

  protected getCellValue(row: T, column: TableColumn<T>): unknown {
    return row[column.key];
  }

  protected onRowClick(row: T): void {
    if (!this.rowClickable()) {
      return;
    }

    this.tableEvent.emit({
      type: 'rowClick',
      row,
    });
  }

  /*
   * =========================================================
   * Sorting
   * =========================================================
   */

  protected onSort(column: TableColumn<T>): void {
    if (!column.sortable) {
      return;
    }

    const columnKey = column.key;

    let direction: TableSortDirection = 'asc';

    if (this.activeSort() === columnKey) {
      switch (this.sortDirection()) {
        case 'asc':
          direction = 'desc';
          break;

        case 'desc':
          direction = '';
          break;

        default:
          direction = 'asc';
      }
    }

    this.activeSort.set(direction ? columnKey : '');

    this.sortDirection.set(direction);

    const sort: TableSort = {
      active: columnKey,
      direction,
    };

    this.tableEvent.emit({
      type: 'sort',
      sort,
    });
  }

  protected getSortIcon(column: TableColumn<T>): string {
    if (this.activeSort() !== column.key || !this.sortDirection()) {
      return 'unfold_more';
    }

    return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  /* =====================================================
     PAGINATION
     ===================================================== */

  protected onPageChange(event: PageEvent): void {
    this.tableEvent.emit({
      type: 'page',

      page: {
        pageIndex: event.pageIndex,

        pageSize: event.pageSize,

        length: event.length,
      },
    });
  }

  /*
   * =========================================================
   * Actions
   * =========================================================
   */

  protected onAction(event: MouseEvent, action: TableAction<T>, row: T): void {
    /*
     * Prevent rowClick from firing.
     */
    event.stopPropagation();

    if (action.disabled?.(row)) {
      return;
    }

    this.tableEvent.emit({
      type: 'action',
      action: action.id,
      row,
    });
  }

  protected isActionVisible(action: TableAction<T>, row: T): boolean {
    return action.visible ? action.visible(row) : true;
  }

  protected isActionDisabled(action: TableAction<T>, row: T): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  /* =====================================================
     SELECTION
     ===================================================== */

  protected isSelected(row: T): boolean {
    const id = this.getRowId(row);

    return this.selectedRows().some(
      (selected) => this.getRowId(selected) === id,
    );
  }

  protected toggleRow(event: MatCheckboxChange, row: T): void {
    const selected = [...this.selectedRows()];

    const id = this.getRowId(row);

    const index = selected.findIndex((item) => this.getRowId(item) === id);

    if (event.checked) {
      if (index === -1) {
        selected.push(row);
      }
    } else {
      if (index >= 0) {
        selected.splice(index, 1);
      }
    }

    this.selectedRows.set(selected);

    this.emitSelection();
  }

  protected toggleAll(event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedRows.set([...this.rows()]);
    } else {
      this.selectedRows.set([]);
    }

    this.emitSelection();
  }

  private emitSelection(): void {
    this.tableEvent.emit({
      type: 'selection',

      rows: this.selectedRows(),
    });
  }
}
