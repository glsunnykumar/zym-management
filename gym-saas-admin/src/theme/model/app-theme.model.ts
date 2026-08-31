/**
 * Represents a single application theme.
 * Every theme registered in GymFlow must implement this interface.
 */
export interface AppTheme {

  /**
   * Unique identifier.
   * Example:
   * light
   * dark
   * gym
   */
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Short description.
   */
  description: string;

  /**
   * Whether this is a dark theme.
   */
  dark: boolean;

  /**
   * Preview colors used by Theme Preview.
   */
  preview: {

    primary: string;

    secondary: string;

    surface: string;

    background: string;

  };

}