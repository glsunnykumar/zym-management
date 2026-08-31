import { DOCUMENT } from "@angular/common";
import { inject, signal, effect, computed, Injectable } from "@angular/core";
import { StorageService } from "../../app/core/services/storage/storage.service";
import { DEFAULT_THEME, THEME_CLASS_PREFIX, THEME_STORAGE_KEY } from "../constants/theme.constants";
import { THEME_REGISTRY } from "../registry/theme.registry";
import { AppTheme } from "../model/app-theme.model";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly document = inject(DOCUMENT);

  private readonly storage = inject(StorageService);

   /**
   * All registered themes.
   */
  readonly themes = signal<readonly AppTheme[]>(THEME_REGISTRY);

  /**
   * Current theme id.
   */
  readonly currentThemeId = signal(
    this.storage.get<string>(
      THEME_STORAGE_KEY,
      DEFAULT_THEME
    ) ?? DEFAULT_THEME
  );

    /**
   * Current theme object.
   */
  readonly currentTheme = computed(() =>
    this.themes().find(
      theme => theme.id === this.currentThemeId()
    ) ?? this.themes()[0]
  );

  constructor() {

    effect(() => {

      this.applyTheme(this.currentTheme());

    });

  }

   /**
   * Sets active theme.
   */
  setTheme(themeId: string): void {

    if (!this.themeExists(themeId)) {
      return;
    }

    this.currentThemeId.set(themeId);

    this.storage.set(
      THEME_STORAGE_KEY,
      themeId
    );

  }

  readonly isDarkMode = computed(
  () => this.currentTheme().dark
);

   /**
   * Returns true if theme exists.
   */
  themeExists(id: string): boolean {

    return this.themes().some(
      theme => theme.id === id
    );

  }

    /**
   * Toggles Light/Dark.
   * Other themes remain unchanged.
   */
  toggleDarkMode(): void {

    if (this.currentTheme().dark) {

      this.setTheme('light');

      return;

    }

    this.setTheme('dark');

  }


    /**
   * Applies theme class.
   */
  private applyTheme(theme: AppTheme): void {

    const html = this.document.documentElement;

    this.themes().forEach(item => {

      html.classList.remove(
        `${THEME_CLASS_PREFIX}${item.id}`
      );

    });

    html.classList.add(
      `${THEME_CLASS_PREFIX}${theme.id}`
    );  

  }

}