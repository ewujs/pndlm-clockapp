import { breakpoints } from './breakpoints';
import type { BreakpointKey } from '@/types/rwdTypes';

/**
 * Utility map of media query strings for each breakpoint.
 *
 * Can be used for styling, debugging, or extending the responsive system manually.
 *
 * @example
 * const mq = mediaQueries.md; // '(min-width: 768px)'
 */
export const mediaQueries: Record<BreakpointKey | 'landscape' | 'portrait', string> = {
	xs: `(min-width: ${breakpoints.sm - 1}px)`,
	sm: `(min-width: ${breakpoints.sm}px)`,
	md: `(min-width: ${breakpoints.md}px)`,
	lg: `(min-width: ${breakpoints.lg}px)`,
	xl: `(min-width: ${breakpoints.xl}px)`,
	landscape: `(orientation: landscape)`,
	portrait: `(orientation: portrait)`,
};
