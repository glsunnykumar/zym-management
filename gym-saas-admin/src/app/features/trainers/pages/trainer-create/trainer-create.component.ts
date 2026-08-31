import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { TrainerFormComponent } from '../../components/trainer-form/trainer-form.component';

import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'gf-trainer-create',
  standalone: true,
  imports: [
    TrainerFormComponent
  ],
  templateUrl: './trainer-create.component.html',
  styleUrl: './trainer-create.component.scss'
})
export class TrainerCreateComponent {

  private readonly trainerService =
    inject(TrainerService);

  private readonly router =
    inject(Router);

  async createTrainer(
    trainer: any
  ): Promise<void> {

    try {

      await this.trainerService.createTrainer({

        ...trainer,

        createdAt: Date.now()

      });

      alert('Trainer created successfully');

      this.router.navigate([
        '/trainers'
      ]);

    } catch (error) {

      console.error(error);

      alert(
        'Failed to create trainer'
      );

    }

  }

  goBack(): void {

    this.router.navigate([
      '/trainers'
    ]);

  }

}