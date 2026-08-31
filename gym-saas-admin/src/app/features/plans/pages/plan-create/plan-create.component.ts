import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { PlanFormComponent }
from '../../components/plan-form/plan-form.component';

import { PlanService }
from '../../services/plan.service';
import { PageLayoutComponent } from "../../../../shared/ui/layout/page-layout/page-layout.component";
import { PageHeaderComponent } from "../../../../shared/ui/layout/page-header/page-header.component";
import { AppCardComponent } from "../../../../shared/components/app-card/app-card.component";

@Component({
  selector: 'gf-plan-create',
  standalone: true,
  imports: [
    PlanFormComponent,
    PageLayoutComponent,
    PageHeaderComponent,
    AppCardComponent
],
  templateUrl:
    './plan-create.component.html',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class PlanCreateComponent {

  private readonly planService =
    inject(PlanService);

  private readonly router =
    inject(Router);

  async createPlan(
    formValue: any
  ): Promise<void> {

    const now = Date.now();

    await this.planService.createPlan({

      ...formValue,

      createdAt: now,
      updatedAt: now

    });

    this.router.navigate([
      '/plans'
    ]);

  }

  onCancel(): void {

  console.log('CANCELLED');

  this.router.navigate([
    '/plans'
  ]);

}

}