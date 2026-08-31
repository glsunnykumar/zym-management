import { AppTheme } from "../model/app-theme.model";


export const THEME_REGISTRY: ReadonlyArray<AppTheme> = [

  {
    id: 'light',
    name: 'Light',
    description: 'Clean light workspace',

    dark: false,

    preview: {
      primary: '#2563EB',
      secondary: '#3B82F6',
      surface: '#FFFFFF',
      background: '#F5F7FA'
    }
  },

  {
    id: 'dark',
    name: 'Dark',
    description: 'Comfortable low light experience',

    dark: true,

    preview: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      surface: '#1F2937',
      background: '#111827'
    }
  },

  {
    id: 'gym',
    name: 'GymFlow',

    description: 'Energy inspired fitness theme',

    dark: false,

    preview: {
      primary: '#FF6B00',
      secondary: '#FF9A3C',
      surface: '#FFFFFF',
      background: '#F8F9FA'
    }
  },

  {
    id: 'ocean',
    name: 'Ocean',

    description: 'Ocean inspired blue palette',

    dark: false,

    preview: {
      primary: '#0077B6',
      secondary: '#00B4D8',
      surface: '#FFFFFF',
      background: '#F1FAFF'
    }
  },

  {
    id: 'forest',
    name: 'Forest',

    description: 'Natural green workspace',

    dark: false,

    preview: {
      primary: '#2E7D32',
      secondary: '#4CAF50',
      surface: '#FFFFFF',
      background: '#F3FFF3'
    }
  },

  {
    id: 'corporate',
    name: 'Corporate',

    description: 'Professional enterprise palette',

    dark: false,

    preview: {
      primary: '#3949AB',
      secondary: '#5C6BC0',
      surface: '#FFFFFF',
      background: '#F4F6FB'
    }
  }

] as const;