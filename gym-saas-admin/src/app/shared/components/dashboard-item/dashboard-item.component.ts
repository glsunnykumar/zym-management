import { ChangeDetectionStrategy, Component, computed, HostBinding, input } from '@angular/core';

@Component({
  selector: 'gf-dashboard-item',
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardItemComponent {

   readonly span = input(12);

  @HostBinding('style.grid-column')
  protected get gridColumn(): string {
    return `span ${this.validSpan()}`;
  }

  protected readonly validSpan = computed(() => {

    const value = this.span();

    if (value < 1) {
      return 1;
    }

    if (value > 12) {
      return 12;
    }

    return value;

  });

}
