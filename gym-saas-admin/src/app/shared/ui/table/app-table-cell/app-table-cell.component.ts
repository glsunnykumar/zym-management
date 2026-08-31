import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { StatusChipComponent } from '../../display/status-chip/status-chip.component';

import { TableColumn } from '../models/table-column.model';


@Component({
  selector: 'app-app-table-cell',
  imports: [
     CommonModule,
    StatusChipComponent
  ],
    providers: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './app-table-cell.component.html',
  styleUrl: './app-table-cell.component.scss'
})
export class AppTableCellComponent<T> {

    @Input({ required: true })
  row!: T;

  @Input({ required: true })
  column!: TableColumn<T>;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  get value(): any {
    return (this.row as any)?.[this.column.key as string];
  }

  formatCurrency(): string {
    return this.currencyPipe.transform(
      this.value,
      'INR',
      'symbol',
      '1.0-0'
    ) ?? '';
  }

  formatDate(): string {
    return this.datePipe.transform(
      this.value,
      'dd MMM yyyy'
    ) ?? '';
  }


}
