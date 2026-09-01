import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'gf-trainer-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class TrainerDetailsComponent implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly trainerService =
    inject(TrainerService);

  readonly trainer =
    signal<Trainer | null>(null);

  async ngOnInit(): Promise<void> {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/trainers']);
      return;
    }

    const trainer =
      await this.trainerService.getTrainerById(id);

    if (!trainer) {
      this.router.navigate(['/trainers']);
      return;
    }

    this.trainer.set(trainer);

  }

  editTrainer(): void {

    const trainer =
      this.trainer();

    if (!trainer) {
      return;
    }

    this.router.navigate([
      '/trainers',
      trainer.id,
      'edit'
    ]);

  }

  goBack(): void {

    this.router.navigate([
      '/trainers'
    ]);

  }

}