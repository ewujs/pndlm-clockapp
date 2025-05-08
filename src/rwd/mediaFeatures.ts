/**
 * A list of valid CSS media features used in media queries.
 * 
 * This array is used to validate or reference acceptable media feature names
 * when generating dynamic media queries, especially for responsive design helpers.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media
 */
export const VALID_MEDIA_FEATURES = [
	'min-width',
	'max-width',
	'width',
	'min-height',
	'max-height',
	'height',
	'orientation',
	'aspect-ratio',
	'min-aspect-ratio',
	'max-aspect-ratio',
	'resolution',
	'hover',
	'any-hover',
	'pointer',
	'any-pointer',
	'color',
	'monochrome',
	'prefers-color-scheme',
	'prefers-reduced-motion',
	'prefers-contrast',
	'update',
	'overflow-block',
	'overflow-inline',
];
