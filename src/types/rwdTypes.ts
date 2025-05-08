import { CSSObject } from '@emotion/react';
import { breakpoints } from '@/rwd';

/**
 * All available named breakpoints from the config.
 */
export type BreakpointKey = keyof typeof breakpoints;

/**
 * Valid device types inferred from responsive logic.
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Orientation types based on media query orientation feature.
 */
export type Orientation = 'portrait' | 'landscape';

/**
 * Custom rule for media query matching.
 * Can be used to define raw `minWidth`/`maxWidth` rules.
 */
export type MediaRange = {
	minWidth: number;
	maxWidth: number;
};

/**
 * Responsive style input for `rwd()` utility.
 * Strictly typed to allow only valid keys:
 * - Named breakpoints: 'xs', 'sm', 'md', 'lg', 'xl'
 * - Orientation queries: 'portrait', 'landscape'
 * - Optional: raw minWidth/maxWidth queries
 *
 * Falsy values (false/null/undefined) will be ignored.
 */
export type RwdInput = {
	[K in BreakpointKey | Orientation]?: CSSObject | false | null | undefined;
} & {
	minWidth?: Record<number, CSSObject | false | null | undefined>;
	maxWidth?: Record<number, CSSObject | false | null | undefined>;
};

/**
 * Union of accepted media feature keys.
 * Includes camelCase and standard CSS features.
 */
export type MediaFeatureKey =
	| 'minWidth'
	| 'maxWidth'
	| 'width'
	| 'minHeight'
	| 'maxHeight'
	| 'height'
	| 'aspectRatio'
	| 'minAspectRatio'
	| 'maxAspectRatio'
	| 'orientation'
	| 'hover'
	| 'anyHover'
	| 'pointer'
	| 'anyPointer'
	| 'resolution'
	| 'color'
	| 'colorGamut'
	| 'monochrome'
	| 'update'
	| 'prefersColorScheme'
	| 'prefersContrast'
	| 'invertedColors'
	| 'displayMode'
	| 'forcedColors'
	| 'grid'
	| 'scan';

/**
 * Represents a single media condition.
 * Supports common media features like minWidth, orientation, etc.
 */
export type MediaCondition = {
	[key in MediaFeatureKey]?: string | number;
};

/**
 * Accepts:
 * - a single MediaCondition
 * - or an array of MediaCondition objects (joined with OR `,`)
 * Along with a shared styles object.
 */
export type MediaConfigInput = {
	conditions: MediaCondition | MediaCondition[];
	styles: CSSObject;
};

/**
 * Represents a shorthand object notation for multiple media conditions.
 * Each key-value pair corresponds to a media feature and its desired value.
 *
 * This is used in utilities like `media.and()` or `media.or()` to define
 * multiple conditions in a single object, which are internally expanded into
 * individual media query segments.
 *
 * @example
 * media.and({ min: 1024, orientation: 'portrait' }).css({ fontSize: '20px' });
 */
export type MediaConditionObject = Record<string, string | number | boolean>;
