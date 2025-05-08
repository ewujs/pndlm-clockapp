import { css } from '@emotion/react';
import { media, rwd } from '@/rwd';

/**
 * Emotion CSS style for the login page shared across breakpoints.
 */
export const baseLoginPageStyle = css({
	display: 'grid',
	containerType: 'inline-size',
	width: '100%',
	height: '100vh',
	gridTemplateAreas: `
		'.'
		'logo'
		'loginForm'
	`,
	gridTemplateRows: '143px 139px 1fr',
});

/**
 * Responsive layout definitions using custom rwd utility.
 */
export const loginGridRwdStyle = rwd({
	md: {
		gridTemplateRows: '2fr 1.5fr 6fr',
	},
	lg: {
		gridTemplateRows: '1fr 1.5fr 6fr',
	},
	xl: {
		gridTemplateRows: '3fr 2fr 8fr',
	},
});

/**
 * Emotion CSS style for the landscape mode on mobile.
 */
export const loginGridMobileLandscapeStyle = media.mobileLandscape.css({
	gridTemplateAreas: `
		'.    loginForm'
		'logo loginForm'
		'.    loginForm'
	`,
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(3, 1fr)',
	columnGap: 0,
});

/**
 * Adjusts rows for very narrow screens (i.e., narrow mobile like iPhone SE).
 */
export const loginGridUltraSmallStyle = media('(max-width: 392px)', {
	gridTemplateRows: '1fr 1fr 4fr',
});

/**
 * Adds spacing between columns in landscape mode for ultra small screens.
 */
export const loginGridUltraSmallLandscapeStyle = media.and({ maxWidth: 667, orientation: 'landscape' }).css({
	columnGap: '6cqi',
});

/**
 * Custom layout for large portrait displays (e.g., iPads).
 */
export const loginGridLargePortraitStyle = media.and({ minWidth: 1024, orientation: 'portrait' }).css({
	gridTemplateRows: '3fr 1fr 6fr',
});
