import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'gf-app-shell',
  imports: [
     CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
 protected readonly layout = inject(LayoutService);

}
