import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Plan } from '../../models/plan.model';
import { PlanService } from '../../services/plan.service';


import { SearchToolbarComponent }
from '../../../../shared/components/search-toolbar/search-toolbar.component';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { PlanFacade } from '../../models/plan.facade';
import { TableAction } from '../../../../shared/models/table-action.model';
import { TableEvent } from '../../../../shared/models/table-event.model';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'gf-plans-list',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    SearchToolbarComponent,
    DataTableComponent,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './plans-list.component.html',
  styleUrl: './plans-list.component.scss',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class PlansListComponent
implements OnInit {

   private readonly dialog =
    inject(MatDialog);
  

  private readonly facade =
    inject(PlanFacade);

  private readonly service =
    inject(PlanService);

  private readonly router =
    inject(Router);

  readonly search =
    signal('');

  readonly plans =
    this.facade.plans;

  readonly filteredPlans =
    computed(() => {

      const term =
        this.search()
          .toLowerCase();

      return this.plans()
        .filter(plan =>
          plan.name
            .toLowerCase()
            .includes(term)
        );

    });

  readonly columns : readonly TableColumn<Plan>[] = [

    {
      key: 'name',
      label: 'Plan Name',
      sortable: true
    },

    {
      key: 'price',
      label: 'Price'
    },

    {
      key: 'durationDays',
      label: 'Duration'
    },

    {
      key: 'isActive',
      label: 'Status'
    }

  ];

  readonly actions:
    TableAction<Plan>[] = [

    {
      id: 'view',
      icon: 'visibility',
      label: 'View'
    },

    {
      id: 'edit',
      icon: 'edit',
      label: 'Edit'
    },

    {
      id: 'delete',
      icon: 'delete',
      label: 'Delete'
    }

  ];

  ngOnInit(): void {

    this.facade.loadPlans();

  }

  addPlan(): void {

    this.router.navigate([
      '/plans/create'
    ]);

  }

  onTableEvent(
    event: TableEvent<Plan>
  ): void {

    if (
      event.type !== 'action' ||
      !event.row
    ) {
      return;
    }

    switch (event.action) {

      case 'view':
        this.router.navigate([
          '/plans',
          event.row.id
        ]);
        break;

      case 'edit':
        this.router.navigate([
          '/plans',
          event.row.id,
          'edit'
        ]);
        break;

      case 'delete':
        this.deletePlan(
          event.row
        );
        break;

    }

  }

  async deletePlan(
    plan: Plan
  ): Promise<void> {


       const confirmed = await this.dialog
          .open(ConfirmDialogComponent, {
            width: '420px',
    
            data: {
              title: 'Delete Plan',
    
              message: `Are you sure you want to delete ${plan.name}?`,
    
              confirmText: 'Delete',
              cancelText: 'Cancel',
            },
          })
          .afterClosed()
          .toPromise();
    
        if (!confirmed) {
          return;
        }

         await this.service
      .deletePlan(plan.id);


  }

}