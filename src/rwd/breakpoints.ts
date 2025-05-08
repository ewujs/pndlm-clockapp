/**
 * A centralized breakpoint map for responsive design.
 *
 * These named breakpoints represent common screen width thresholds and are used
 * throughout the `rwd` system (including the `rwd()` function and media query hooks).
 *
 * Breakpoint naming convention:
 * - `xs`: Extra small devices (mobile)
 * - `sm`: Small devices (large phones / small tablets)
 * - `md`: Medium devices (tablets / small laptops)
 * - `lg`: Large devices (desktops)
 * - `xl`: Extra large screens (large desktops)
 */
export const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 1024,
	xl: 1280,
} as const;
