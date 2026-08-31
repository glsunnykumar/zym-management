import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private readonly dialog = inject(MatDialog);

  open<T>(
    component: any,
    config?: MatDialogConfig<T>
  ) {
    return this.dialog.open(component, config);
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

}