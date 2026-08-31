import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { StatusType } from '../../models/status.model';

@Component({
  selector: 'gf-status-chip',
  imports: [
     MatChipsModule,
    MatIconModule
  ],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss'
})
export class StatusChipComponent {

  readonly status = input.required<StatusType>();

  readonly showIcon = input(true);

  readonly label = computed(() =>
    this.status().charAt(0).toUpperCase() + this.status().slice(1)
  );

  readonly icon = computed(() => {

    switch (this.status()) {

      case 'active':
      case 'success':
        return 'check_circle';

      case 'inactive':
        return 'pause_circle';

      case 'pending':
        return 'schedule';

      case 'expired':
        return 'event_busy';

      case 'cancelled':
      case 'error':
        return 'cancel';

      case 'warning':
        return 'warning';

      default:
        return 'info';

    }

  });

}
