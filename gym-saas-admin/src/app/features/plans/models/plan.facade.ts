import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';


import { Plan }
from '../models/plan.model';
import { PlanService } from '../services/plan.service';

@Injectable({
  providedIn: 'root'
})
export class PlanFacade {

  private readonly planService =
    inject(PlanService);

  readonly plans =
    signal<Plan[]>([]);

  readonly loading =
    signal(false);

  readonly total =
    computed(
      () => this.plans().length
    );

  loadPlans(): void {

    this.loading.set(true);

    this.planService
      .getPlans()
      .subscribe(plans => {

        this.plans.set(plans);

        this.loading.set(false);

      });

  }

}