import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppCardComponent } from '../app-card/app-card.component';

@Component({
  selector: 'gf-stat-card',
  imports: [
    AppCardComponent,
    MatIconModule
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {

   readonly title = input.required<string>();

  readonly value = input.required<string | number>();

  readonly icon = input.required<string>();

  readonly description = input<string>('');

  readonly change = input<string>('');

  readonly changeType = input<'positive' | 'negative' | 'neutral'>('neutral');

  readonly changeClass = computed(() => {
    switch (this.changeType()) {
      case 'positive':
        return 'positive';

      case 'negative':
        return 'negative';

      default:
        return 'neutral';
    }
  });

}
