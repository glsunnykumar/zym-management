import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../theme/services/theme.service';
import { Auth, authState } from '@angular/fire/auth';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
//import { AppShellComponent } from './core/layout/app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinner],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gym-saas-admin';

  loading = true;

  private readonly theme = inject(ThemeService);

  constructor(auth: Auth) {
    authState(auth).subscribe(() => {
      this.loading = false;
    });
  }
}
