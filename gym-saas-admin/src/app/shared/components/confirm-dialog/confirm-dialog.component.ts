import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { ConfirmDialogData }
from './confirm-dialog.model';

@Component({
  selector: 'gf-confirm-dialog',
  imports: [
    MatButtonModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
    changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(
      private dialogRef:
      MatDialogRef<ConfirmDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data:
      ConfirmDialogData

  ) {}

   cancel(): void {

    this.dialogRef.close(false);

  }

  confirm(): void {

    this.dialogRef.close(true);

  }
}
