import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gf-app-card',
  imports: [],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCardComponent {

   readonly title = input<string>('');

  readonly subtitle = input<string>('');

}
