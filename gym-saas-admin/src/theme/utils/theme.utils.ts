
import { DEFAULT_THEME } from '../constants/theme.constants';
import { AppTheme } from '../model/app-theme.model';
import { THEME_REGISTRY } from '../registry/theme.registry';

/**
 * Returns all registered themes.
 */
export function getThemes(): readonly AppTheme[] {
  return THEME_REGISTRY;
}

/**
 * Returns the default theme.
 */
export function getDefaultTheme(): AppTheme {
  return getTheme(DEFAULT_THEME);
}

/**
 * Returns a theme by id.
 * Falls back to the default theme if not found.
 */
export function getTheme(id: string): AppTheme {

  return (
    THEME_REGISTRY.find(theme => theme.id === id)
    ?? THEME_REGISTRY.find(theme => theme.id === DEFAULT_THEME)!
  );

}

/**
 * Checks whether a theme exists.
 */
export function themeExists(id: string): boolean {
  return THEME_REGISTRY.some(theme => theme.id === id);
}

/**
 * Returns true if the theme is dark.
 */
export function isDarkTheme(id: string): boolean {
  return getTheme(id).dark;
}

/**
 * Returns all theme ids.
 */
export function getThemeIds(): readonly string[] {
  return THEME_REGISTRY.map(theme => theme.id);
}
