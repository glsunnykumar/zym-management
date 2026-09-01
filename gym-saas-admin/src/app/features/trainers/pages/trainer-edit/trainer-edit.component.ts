import { Component, OnInit, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer.service';
import { TrainerFormComponent } from '../../components/trainer-form/trainer-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageLayoutComponent } from "../../../../shared/ui/layout/page-layout/page-layout.component";
import { PageHeaderComponent } from "../../../../shared/ui/layout/page-header/page-header.component";

@Component({
  selector: 'gf-trainer-edit',
  standalone: true,
  imports: [CommonModule, TrainerFormComponent, PageLayoutComponent, PageHeaderComponent],
  templateUrl: './trainer-edit.component.html',
  styleUrl: './trainer-edit.component.scss',
})
export class TrainerEditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly trainerService = inject(TrainerService);

  readonly trainer = signal<Trainer | null>(null);

  readonly loading = signal(true);

  private readonly dialog = inject(MatDialog);

  private readonly snackBar = inject(MatSnackBar);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/trainers']);
      return;
    }

    const trainer = await this.trainerService.getTrainerById(id);

    if (!trainer) {
      this.router.navigate(['/trainers']);
      return;
    }

    this.trainer.set(trainer);

    this.loading.set(false);
  }

  async updateTrainer(data: Partial<Trainer>): Promise<void> {
    const trainer = this.trainer();

    if (!trainer) {
      return;
    }

    const confirmed = await firstValueFrom(
      this.dialog
        .open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title: 'Update Trainer',
            message: 'Are you sure you want to save these changes?',
            confirmText: 'Update',
            cancelText: 'Cancel',
          },
        })
        .afterClosed(),
    );

    if (!confirmed) {
      return;
    }

    try {
      await this.trainerService.updateTrainer(trainer.id, data);
      this.snackBar.open('Trainer updated successfully', 'Close', {
        duration: 3000,
      });

      this.router.navigate(['/trainers']);
    } catch (error) {
      this.snackBar.open('Failed to update trainer', 'Close', {
        duration: 3000,
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/trainers']);
  }
}
