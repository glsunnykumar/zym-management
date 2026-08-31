import {
  getDefaultTheme,
  getTheme,
  getThemes,
  themeExists
} from '../utils/theme.utils'; // <-- change this path to where your functions are

import { AppTheme } from "../model/app-theme.model";

export class ThemeHelper {

    static getTheme(id: string): AppTheme {
        return getTheme(id);
    }

    static getDefault(): AppTheme {
        return getDefaultTheme();
    }

    static exists(id: string): boolean {
        return themeExists(id);
    }

    static getThemes(): readonly AppTheme[] {
        return getThemes();
    }
}