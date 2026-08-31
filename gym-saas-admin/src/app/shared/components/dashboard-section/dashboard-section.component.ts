import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gf-dashboard-section',
  imports: [],
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSectionComponent {

   readonly title = input.required<string>();

  readonly subtitle = input<string>('');

}
