import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Plan } from '../../models/plan.model';
import { PlanService } from '../../services/plan.service';

import { PageLayoutComponent }
from '../../../../shared/ui/layout/page-layout/page-layout.component';

import { PageHeaderComponent }
from '../../../../shared/ui/layout/page-header/page-header.component';

import { AppCardComponent }
from '../../../../shared/components/app-card/app-card.component';

import { MatButtonModule }
from '@angular/material/button';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'gf-plan-details',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    AppCardComponent,
    MatButtonModule
  ],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.scss'
})
export class PlanDetailsComponent
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly planService =
    inject(PlanService);

  readonly plan =
    signal<Plan | null>(null);

    private readonly dialog =
  inject(MatDialog);

  async ngOnInit(): Promise<void> {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    const plan =
      await this.planService
        .getPlanById(id);

    this.plan.set(plan);

  }

  editPlan(): void {

    const plan = this.plan();

    if (!plan) {
      return;
    }

    this.router.navigate([
      '/plans',
      plan.id,
      'edit'
    ]);

  }

  async deletePlan(): Promise<void> {

  const plan = this.plan();

  if (!plan) {
    return;
  }

  const confirmed = await this.dialog
    .open(ConfirmDialogComponent, {
      width: '420px',

      data: {
        title: 'Delete Plan',

        message:
          `Are you sure you want to delete ${plan.name}?`,

        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    })
    .afterClosed()
    .toPromise();

  if (!confirmed) {
    return;
  }

  await this.planService.deletePlan(plan.id);

  this.router.navigate([
    '/plans'
  ]);

}

}