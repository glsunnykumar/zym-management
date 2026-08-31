import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import { Breadcrumb } from '../../models/breadcrumb.model';
import { PageAction } from '../../models/page-action.model';
import { PageConfig } from '../../models/page-config.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  /**
   * Page title
   */
  readonly title = signal('Dashboard');

  /**
   * Page subtitle
   */
  readonly subtitle = signal('');

  /**
   * Breadcrumbs
   */
  readonly breadcrumbs = signal<Breadcrumb[]>([]);

  /**
   * Toolbar actions
   */
  readonly actions = signal<PageAction[]>([]);

  /**
   * Whether breadcrumbs should be displayed.
   */
  readonly hasBreadcrumbs = computed(() =>
    this.breadcrumbs().length > 0
  );

  readonly PageConfig = computed<PageConfig>(() => ({
    title: this.title(),
    subtitle: this.subtitle(),
    breadcrumbs: this.breadcrumbs(),
    actions: this.actions()
  }));

  /**
   * Whether page actions exist.
   */
  readonly hasActions = computed(() =>
    this.actions().length > 0
  );

  /**
   * Update page title.
   */
  setTitle(title: string): void {
    this.title.set(title);
  }

  /**
   * Update page subtitle.
   */
  setSubtitle(subtitle: string): void {
    this.subtitle.set(subtitle);
  }

  /**
   * Update breadcrumbs.
   */
  setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
    this.breadcrumbs.set(breadcrumbs);
  }

  /**
   * Update page actions.
   */
  setActions(actions: PageAction[]): void {
    this.actions.set(actions);
  }

  /**
   * Configure the complete page.
   */
configure(config: PageConfig): void {
  this.title.set(config.title);
  this.subtitle.set(config.subtitle ?? '');
  this.breadcrumbs.set(config.breadcrumbs ?? []);
  this.actions.set(config.actions ?? []);
}

  /**
   * Reset navigation state.
   */
  reset(): void {

    this.title.set('');
    this.subtitle.set('');
    this.breadcrumbs.set([]);
    this.actions.set([]);

  }

}