import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { LayoutService } from '../../services/layout/layout.service';
import { SIDEBAR_MENU } from './constants/sidebar-menu';

@Component({
  selector: 'gf-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected readonly layout = inject(LayoutService);

  protected readonly menu = SIDEBAR_MENU;

  expandedMenus = signal<string[]>([]);

  toggleMenu(label: string): void {
    const expanded = this.expandedMenus();

    if (expanded.includes(label)) {
      this.expandedMenus.set(expanded.filter((item) => item !== label));
    } else {
      this.expandedMenus.set([...expanded, label]);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedMenus().includes(label);
  }
}
