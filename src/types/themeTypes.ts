/**
 * Represents the application's theme mode.
 */
export type ThemeMode = 'light' | 'dark' | 'luxury';

/**
 * Available clock face styles.
 */
export type ClockFace = 'minimalist' | 'classic' | 'luxury';

/**
 * Represents the state shape for the theme slice.
 */
export interface ThemeState {
	mode: ThemeMode;
	clockFace: ClockFace;
}
