import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { SettingService } from '../../service/setting/setting.service';
import { SidebarComponent } from "../../core/layout/sidebar/sidebar.component";
import { TopbarComponent } from "../../core/layout/topbar/topbar.component";

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    SidebarComponent,
    TopbarComponent
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  gymSettings: any = null;

 constructor(private authService: AuthService,
   private settingsService: SettingService,
   private router: Router) {}
ngOnInit(): void {
  this.authService.user$.subscribe(async (user) => {
    if (!user) return;

    this.gymSettings = await this.settingsService.getSettings();
  });
}
  logout() {
  console.log('Logout clicked');
  this.authService.logout().then(() => {
    this.router.navigate(['/login']);
  });
}

}
