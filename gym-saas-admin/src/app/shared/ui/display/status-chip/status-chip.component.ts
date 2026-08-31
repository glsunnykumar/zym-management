import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StatusChipConfig } from '../../models/status-chip.model';


@Component({
  selector: 'app-status-chip',
  imports: [
        CommonModule,
    MatIconModule
  ],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss'
})
export class StatusChipComponent implements OnChanges {

  @Input({ required: true })

    status: unknown;
  config!: StatusChipConfig;

   ngOnChanges(): void {
    this.config = this.mapStatus(this.status);
  }


    private mapStatus(status: unknown): StatusChipConfig {

    const value = String(status ?? '').trim().toLowerCase();

    switch (value) {

      case 'active':
      case 'paid':
      case 'present':
      case 'success':
      case 'completed':
      case 'yes':
      case 'true':

       return {
          label: String(status),
          color: 'success',
          icon: 'check_circle'
        };

      case 'pending':
      case 'waiting':
      case 'processing':

        return {
          label: String(status),
          color: 'warning',
          icon: 'schedule'
        };

         case 'inactive':
      case 'expired':
      case 'failed':
      case 'cancelled':
      case 'absent':
      case 'no':
      case 'false':

        return {
          label: String(status),
          color: 'danger',
          icon: 'cancel'
        };

      default:

        return {
          label: String(status),
          color: 'default',
          icon: 'info'
        };
    }

  }

}
