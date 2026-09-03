import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { LayoutService } from '../../services/layout/layout.service';
import { NavigationService } from '../../services/navigation/navigation.service';

import { ThemeService } from '../../../../theme/services/theme.service';

import { AuthService } from '../../../features/auth/services/auth.service';

import { SettingService } from '../../../service/setting/setting.service';

import { AppSettings } from '../../../features/settings/models/settings.model';

import { NotificationService } from '../../../core/services/notification/notification.service';

import { AppNotification } from '../../models/notification.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'gf-topbar',
  standalone: true,

  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
  ],

  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  protected readonly layout = inject(LayoutService);

  protected readonly navigation = inject(NavigationService);

  protected readonly theme = inject(ThemeService);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  private readonly settingsService = inject(SettingService);

  private readonly notificationService = inject(NotificationService);

  readonly settings = signal<AppSettings | null>(null);

  readonly notifications = signal<AppNotification[]>([]);

  async ngOnInit(): Promise<void> {
    const user = this.authService.currentUser();

    if (!user) {
      return;
    }

    // Load Gym Settings

    console.log('Loading settings for user:', user.uid);

    const settings = await this.settingsService.getSettings();

    this.settings.set(settings);

    // Load Notifications

    this.notificationService
      .getNotifications(user.uid)
      .subscribe((notifications) => {
        console.log('Loaded notifications:', notifications);
        this.notifications.set(
          notifications
            .filter((n) => !n.read)
            .sort((a, b) => b.createdAt - a.createdAt),
        );
      });
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  async logout(): Promise<void> {
    await this.authService.logout();

    await this.router.navigate(['/auth/login']);
  }

  async markAsRead(notification: AppNotification): Promise<void> {
    try {
      await this.notificationService.markAsRead('1', notification.id);
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  }
}
