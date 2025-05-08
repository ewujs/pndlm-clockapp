import { css, CSSObject } from '@emotion/react';
import type { MediaCondition, MediaConditionObject } from '@/types/rwdTypes';
import { VALID_MEDIA_FEATURES } from './mediaFeatures';

/**
 * Transforms camelCase media keys (e.g., minWidth) into kebab-case (e.g., min-width).
 *
 * @param key - The original media condition key.
 * @returns The kebab-case version of the key.
 */
const normalizeMediaKey = (key: string): string => key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);

/**
 * Converts a MediaCondition object into a full media query string.
 * Multiple conditions are joined using 'and' or ',' for 'or' logic.
 *
 * @param condition - A MediaCondition object with one or more features.
 * @param combinator - Logical combinator to join conditions ('and' | 'or'), default is 'and'.
 * @returns A complete media query string
 *
 * @example
 * toMediaString({ minWidth: 768, orientation: 'landscape' })
 * // → '(min-width: 768px) and (orientation: landscape)'
 *
 * @example
 * toMediaString({ maxWidth: 1024, aspectRatio: '16/9' }, 'or')
 * // → '(max-width: 1024px), (aspect-ratio: 16/9)'
 */
const toMediaString = (
	condition: MediaCondition,
	combinator: 'and' | 'or' = 'and'
): string => {
	const unitlessKeys = new Set([
		'orientation',
		'hover',
		'any-hover',
		'pointer',
		'any-pointer',
		'aspect-ratio',
		'prefers-color-scheme',
		'prefers-contrast',
		'inverted-colors',
		'monochrome',
		'resolution',
		'color-gamut',
		'update',
	]);

	const segments = Object.entries(condition).map(([key, value]) => {
		const kebabKey = normalizeMediaKey(key);

		if (!VALID_MEDIA_FEATURES.includes(kebabKey)) {
			console.warn(`[rwd utils] Unknown or unsupported media feature: "${key}" -> "${kebabKey}"`);
		}

		const needsUnit = typeof value === 'number' && !unitlessKeys.has(kebabKey);
		const formattedValue = needsUnit ? `${value}px` : value;
		return `(${kebabKey}: ${formattedValue})`;
	});

	const separator = combinator === 'or' ? ', ' : ' and ';
	return segments.join(separator);
};

/**
 * The main `media()` function that applies styles conditionally based on a raw media query string.
 *
 * @param query - A valid raw media query string (e.g., '(min-width: 768px)').
 * @param styles - An Emotion CSSObject to apply within the media block.
 * @returns A CSS block wrapped in the appropriate `@media` query.
 * 
 * @example
 * media('(min-width: 768px)', {
 *   fontSize: '16px',
 * });
 */
export const media = (
	query: string,
	styles: CSSObject
) => {
	if (!query) return styles;

	return css`
		@media ${query} {
			${css(styles)}
		}
	`;
};

/**
 * Combines multiple media conditions using logical OR (`,`) and returns
 * a chained `.css(styles)` function to apply styles if **any** condition matches.
 *
 * Each key-value pair becomes a separate condition.
 * 
 * Example:
 * `{ maxWidth: 768, orientation: 'landscape' }`
 * becomes:
 * `@media (max-width: 768), (orientation: landscape)`
 * 
 * @param conditionObject - A shorthand object where each key is a media feature.
 * @returns An object with a `css(styles)` function that returns the media-wrapped CSS block.
 * 
 * @example
 * media.or({ maxWidth: 768, orientation: 'landscape' }).css({
 *   fontSize: '14px',
 * });
 */
media.or = (conditionObject: MediaConditionObject) => {
	const queries = toMediaString(conditionObject, 'or');

	return {
		/**
		 * Applies the given styles when any of the OR-joined media conditions match.
		 *
		 * @param styles - Emotion-compatible style object.
		 * @returns A CSS block wrapped in the appropriate OR-combined `@media` query.
		 */
		css: (styles: CSSObject) => {
			if (!queries) return css(styles);

			return css`
				@media ${queries} {
					${css(styles)}
				}
			`;
		},
	};
};

/**
 * Combines multiple media conditions using logical AND (`and`) and returns
 * a chained `.css(styles)` function to apply styles if **all** conditions match.
 *
 * All key-value conditions must match for the styles to apply.
 * 
 * Example:
 * `{ minWidth: 1024, orientation: 'portrait' }`
 * becomes:
 * `@media (min-width: 1024px) and (orientation: portrait)`
 * 
 * @param conditionObject - A shorthand object where each key is a media feature.
 * @returns An object with a `css(styles)` function that returns the media-wrapped CSS block.
 * 
 * @example
 * media.and({ minWidth: 1024, orientation: 'portrait' }).css({
 *   display: 'grid',
 * });
 */
media.and = (conditionObject: MediaConditionObject) => {
	const queries = toMediaString(conditionObject, 'and');

	return {
		/**
		 * Applies the given styles when all the AND-joined media conditions match.
		 *
		 * @param styles - Emotion-compatible style object.
		 * @returns A CSS block wrapped in the appropriate AND-combined `@media` query.
		 */
		css: (styles: CSSObject) => {
			if (!queries) return css(styles);

			return css`
				@media ${queries} {
					${css(styles)}
				}
			`;
		},
	};
};

/**
 * Allows passing a raw media query string directly.
 *
 * Use this when a query can't be expressed using shorthand objects,
 * or when using complex expressions like print media, resolutions, etc.
 *
 * @param query - A valid raw media query string.
 * @returns An object with a `.css(styles)` function for applying conditional styles.
 *
 * @example
 * media.raw('(hover: hover) and (pointer: fine)').css({
 *   outline: '1px solid red',
 * });
 */
media.raw = (query: string) => {
	return {
		css: (styles: CSSObject) => {
			if (!query) return css(styles);

			return css`
				@media ${query} {
					${css(styles)}
				}
			`;
		}
	};
};

/**
 * Matches mobile devices in landscape orientation.
 * Combines `orientation`, `max-height`, and touch heuristics.
 *
 * @example
 * media.mobileLandscape.css({ fontSize: '14px' })
 */
media.mobileLandscape = media.and({
	orientation: 'landscape',
	maxHeight: 500,
	pointer: 'coarse',
});
