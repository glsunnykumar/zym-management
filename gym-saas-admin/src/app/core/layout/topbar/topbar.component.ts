import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutService } from '../../services/layout/layout.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ThemeService } from '../../../../theme/services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import { signal } from '@angular/core';
import { SettingService } from '../../../service/setting/setting.service';
import { AppSettings } from '../../../features/settings/models/settings.model';
import {
  NotificationService,
  NotificationItem,
} from '../../../core/services/notification/notification.service';

import { MemberService } from '../../../features/members/services/member.service';

@Component({
  selector: 'gf-topbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
MatMenuModule
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

  private readonly memberService = inject(MemberService);

  private readonly notificationService = inject(NotificationService);

  readonly settings = signal<AppSettings | null>(null);

  readonly notifications = signal<NotificationItem[]>([]);

  

  async ngOnInit(): Promise<void> {
    const user = this.authService.currentUser;

    if (!user) {
      return;
    }

    const settings = await this.settingsService.getSettings();

    this.settings.set(settings);

    this.memberService.getMembers().subscribe((members) => {
      const notifications =
        this.notificationService.getMembershipExpiryNotifications(members);

      this.notifications.set(notifications);
    });
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/auth/login']);
  }
}
