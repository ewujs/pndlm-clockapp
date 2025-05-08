/** @jsxImportSource @emotion/react */
import { css, CSSObject } from '@emotion/react';
import { breakpoints } from './breakpoints';
import { mediaQueries } from './mediaQueries';
import type { RwdInput } from '@/types/rwdTypes';

/**
 * Type guard to check if a string is a valid breakpoint key.
 * Helps ensure only defined breakpoint names are used safely when accessing the `breakpoints` object.
 *
 * @param key - The string key to check
 * @returns `true` if the key is a known breakpoint, otherwise `false`
 */
const isBreakpointKey = (key: string): key is keyof typeof breakpoints => key in breakpoints;

/**
 * Generates responsive styles using Emotion's `css` helper,
 * based on the provided breakpoint-based style definitions.
 *
 * Supports custom breakpoints (xs, sm, md, lg, xl) and orientation queries (`portrait`, `landscape`).
 * Automatically filters out falsy values (false, null, undefined).
 *
 * @param styles - An object where each key is a breakpoint or orientation, and each value is a CSSObject or falsy.
 *   - `xs`: Base styles (applied unconditionally)
 *   - `sm`, `md`, `lg`, `xl`: Styles wrapped in min-width media queries
 *   - `portrait`, `landscape`: Styles wrapped in orientation media queries
 *
 * @returns An Emotion `SerializedStyles` object containing the combined responsive styles.
 * 
 * @example
 * const box = css`
 *   ${rwd({
 *     xs: { fontSize: '14px' },
 *     md: { fontSize: '18px' },
 *     lg: { fontSize: '20px' },
 *     landscape: { border: '2px solid red' },
 *   })}
 * `;
 */
export const rwd = (styles: RwdInput) => {
	// Base styles for the smallest (xs) breakpoint
	const base = styles.xs || {};

	// Generate media queries for all breakpoints and orientations
	const mediaStyles = Object.entries(styles)
		.filter(([key, style]) => key !== 'xs' && key !== 'minWidth' && key !== 'maxWidth' && !!style) // Remove falsy entries
		.map(([key, style]) => {
			if (key === 'landscape') {
				return css`
					@media ${mediaQueries.landscape} {
						${css(style as CSSObject)}
					}
				`;
			}

			if (key === 'portrait') {
				return css`
					@media ${mediaQueries.portrait} {
						${css(style as CSSObject)}
					}
				`;
			}

			// Safely handle named breakpoints
			if (isBreakpointKey(key)) {
				const minWidth = breakpoints[key];
				return css`
					@media (min-width: ${minWidth}px) {
						${css(style as CSSObject)}
					}
				`;
			}
		});

	// Handle raw minWidth styles
	if (styles.minWidth) {
		for (const [px, style] of Object.entries(styles.minWidth)) {
			if (!style) continue;
			mediaStyles.push(css`
				@media (min-width: ${px}px) {
					${css(style as CSSObject)}
				}
			`);
		}
	}

	// Handle raw maxWidth styles
	if (styles.maxWidth) {
		for (const [px, style] of Object.entries(styles.maxWidth)) {
			if (!style) continue;
			mediaStyles.push(css`
				@media (max-width: ${px}px) {
					${css(style as CSSObject)}
				}
			`);
		}
	}

	// Combine base styles and all responsive media queries
	return css(base, ...mediaStyles);
};
