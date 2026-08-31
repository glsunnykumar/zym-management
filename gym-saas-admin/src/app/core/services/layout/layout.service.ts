import { Injectable, computed, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  /**
   * Desktop or Mobile
   */
  readonly isMobile = signal(false);

  /**
   * Sidebar opened
   */
  readonly sidebarOpened = signal(true);

  /**
   * Desktop collapsed state
   */
  readonly sidebarCollapsed = signal(false);

  /**
   * Drawer mode
   */
  readonly drawerMode = computed<MatDrawerMode>(() =>
    this.isMobile() ? 'over' : 'side'
  );

  /**
   * Whether backdrop should be shown.
   */
  readonly hasBackdrop = computed(() =>
    this.isMobile()
  );

  /**
   * Toggle sidebar visibility.
   */
  toggleSidebar(): void {
    this.sidebarOpened.update(open => !open);
  }

  /**
   * Open sidebar.
   */
  openSidebar(): void {
    this.sidebarOpened.set(true);
  }

  /**
   * Close sidebar.
   */
  closeSidebar(): void {
    this.sidebarOpened.set(false);
  }

  /**
   * Collapse desktop sidebar.
   */
  collapseSidebar(): void {
    if (!this.isMobile()) {
      this.sidebarCollapsed.set(true);
    }
  }

  /**
   * Expand desktop sidebar.
   */
  expandSidebar(): void {
    this.sidebarCollapsed.set(false);
  }

  /**
   * Toggle desktop collapse.
   */
  toggleCollapse(): void {
    if (!this.isMobile()) {
      this.sidebarCollapsed.update(value => !value);
    }
  }

  /**
   * Update responsive state.
   */
  setMobile(isMobile: boolean): void {

    this.isMobile.set(isMobile);

    if (isMobile) {
      this.sidebarOpened.set(false);
      this.sidebarCollapsed.set(false);
    } else {
      this.sidebarOpened.set(true);
    }
  }

}