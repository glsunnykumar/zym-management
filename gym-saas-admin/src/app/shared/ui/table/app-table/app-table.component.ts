import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmptyStateComponent } from '../../feedback/empty-state/empty-state.component';
import { AppButtonComponent } from '../../buttons/app-button/app-button.component';
import { LoadingOverlayComponent } from '../../feedback/loading-overlay/loading-overlay.component';
import { StatusChipComponent } from '../../display/status-chip/status-chip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { TableActionEvent, TableConfig } from '../models/table-config.model';
import { AppTableDataSource } from '../../datasource/table.datasource';
import { TableEvent } from '../models/table-event.model';
import { TableAction } from '../../models';
import { AppTableCellComponent } from '../app-table-cell/app-table-cell.component';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,

    MatTableModule,

    MatPaginatorModule,

    MatSortModule,

    MatIconModule,

    MatButtonModule,

    StatusChipComponent,

    LoadingOverlayComponent,

    EmptyStateComponent,

    AppButtonComponent,

    AppTableCellComponent

  ],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss',
})
export class AppTableComponent<T> implements OnChanges
{

@Input({ required: true })
  config!: TableConfig<T>;

  @Input()
  data: T[] = [];

  @Input()
  loading = false;

  @Output()
  tableEvent = new EventEmitter<TableEvent<T>>();

  readonly dataSource = new AppTableDataSource<T>();

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {
      this.dataSource.data = this.data;
    }

    if (changes['config']) {
      this.buildColumns();
    }

  }

  onAction(action: TableAction, row: T): void {

  this.tableEvent.emit({
    type: action.id,
    row
  });

}

  private buildColumns(): void {

    this.displayedColumns = this.config.columns
      .filter(c => !c.hidden)
      .map(c => c.key as string);

    if (this.config.actions?.length) {
      this.displayedColumns.push('actions');
    }

  }


}
