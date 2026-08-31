import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storage = inject(StorageService);

  private readonly KEY = 'theme';

  readonly darkMode = signal(
    this.storage.get<boolean>(this.KEY, false) ?? false
  );

  constructor() {
    this.applyTheme(this.darkMode());
  }

  toggle(): void {

    const dark = !this.darkMode();

    this.darkMode.set(dark);

    this.storage.set(this.KEY, dark);

    this.applyTheme(dark);

  }

  private applyTheme(dark: boolean): void {

    document.documentElement.classList.toggle(
      'light-theme',
      dark
    );

  }

}