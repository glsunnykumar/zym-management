import {
  ChangeDetectionStrategy,
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

import { PlanService }
from '../../services/plan.service';

import { PlanFormComponent }
from '../../components/plan-form/plan-form.component';
import { PageLayoutComponent } from "../../../../shared/ui/layout/page-layout/page-layout.component";
import { PageHeaderComponent } from "../../../../shared/ui/layout/page-header/page-header.component";
import { AppCardComponent } from "../../../../shared/components/app-card/app-card.component";

@Component({
  selector: 'gf-plan-edit',
  standalone: true,
  imports: [
    PlanFormComponent,
    PageLayoutComponent,
    PageHeaderComponent,
    AppCardComponent
],
  templateUrl:
    './plan-edit.component.html',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class PlanEditComponent
implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly planService =
    inject(PlanService);

  readonly plan =
    signal<Plan | null>(null);

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

  async updatePlan(
    value: any
  ): Promise<void> {

    const current =
      this.plan();

    if (!current) {
      return;
    }

    await this.planService
      .updatePlan(
        current.id,
        {
          ...value,
          updatedAt: Date.now()
        }
      );

    this.router.navigate([
      '/plans'
    ]);

  }

}