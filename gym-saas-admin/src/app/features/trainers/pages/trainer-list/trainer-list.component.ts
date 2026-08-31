import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';
import { DataTableComponent } from "../../../../shared/components/data-table/data-table.component";
import { MatOption, MatSelect, MatFormField, MatLabel } from "@angular/material/select";
import { SearchToolbarComponent } from "../../../../shared/components/search-toolbar/search-toolbar.component";
import { PageHeaderComponent } from "../../../../shared/ui/layout/page-header/page-header.component";
import { PageLayoutComponent } from "../../../../shared/ui/layout/page-layout/page-layout.component";
import { TableColumn } from '../../../../shared/models/table-column.model';
import { TableAction } from '../../../../shared/models/table-action.model';
import { TableEvent } from '../../../../shared/models/table-event.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'gf-trainer-list',
  standalone: true,
  imports: [
    CommonModule,
     ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    DataTableComponent,
    MatOption,
    MatSelect,
    MatFormField,
    MatLabel,
    SearchToolbarComponent,
    PageHeaderComponent,
    PageLayoutComponent
],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.scss'
})
export class TrainerListComponent implements OnInit {

  private readonly trainerService =
    inject(TrainerService);

  private readonly router =
    inject(Router);

  readonly trainers =
    signal<Trainer[]>([]);

  readonly loading =
    signal(true);


    readonly trainersVm =
  signal<Trainer[]>([]);

readonly search =
  signal('');

readonly statusFilter =
  signal('');


    readonly columns: TableColumn<Trainer>[] = [

  {
    key: 'fullName',
    label: 'Name'
  },

  {
    key: 'phone',
    label: 'Phone'
  },

  {
    key: 'specialization',
    label: 'Specialization'
  },

  {
    key: 'salary',
    label: 'Salary'
  },

  {
    key: 'status',
    label: 'Status'
  }

];

readonly actions: TableAction<Trainer>[] = [

  {
    id: 'view',
    label: 'View',
    icon: 'visibility'
  },

  {
    id: 'edit',
    label: 'Edit',
    icon: 'edit'
  },

  {
    id: 'delete',
    label: 'Delete',
    icon: 'delete',
    color: 'warn'
  }

];

readonly filteredTrainers = computed(() => {

  let data =
    [...this.trainersVm()];

  const search =
    this.search()
      .toLowerCase()
      .trim();

  if (search) {

    data =
      data.filter(t =>

        t.fullName
          .toLowerCase()
          .includes(search)

        ||

        t.phone
          .toLowerCase()
          .includes(search)

        ||

        t.specialization
          .toLowerCase()
          .includes(search)

      );

  }

  const status =
    this.statusFilter();

  if (status) {

    data =
      data.filter(
        t => t.status === status
      );

  }

  return data;

});

  ngOnInit(): void {

    this.trainerService
      .getTrainers()
      .subscribe(data => {

        this.trainers.set(data);

        this.loading.set(false);

      });

  }

  onAddTrainer(): void {

  this.router.navigate([
    '/trainers/create'
  ]);

}


  onTableEvent(event: any): void {
    console.log('Table event:', event);

    switch (event.type) {
      case 'action':
        switch (event.action) {
          case 'view':
            this.viewTrainer(event.row);
            break;

          case 'edit':
            this.editTrainer(event.row);
            break;

          case 'delete':
            this.deleteTrainer(event.row);
            break;
        }

        break;
    }
  }

  addTrainer(): void {

    this.router.navigate([
      '/trainers/create'
    ]);

  }

  viewTrainer(
    trainer: Trainer
  ): void {

    this.router.navigate([
      '/trainers',
      trainer.id
    ]);

  }

  editTrainer(
    trainer: Trainer
  ): void {

    this.router.navigate([
      '/trainers',
      trainer.id,
      'edit'
    ]);

  }

  async deleteTrainer(
    trainer: Trainer
  ): Promise<void> {

    const confirmed =
      confirm(
        `Delete ${trainer.fullName}?`
      );

    if (!confirmed) {
      return;
    }

    await this.trainerService.deleteTrainer(
      trainer.id
    );

  }

}