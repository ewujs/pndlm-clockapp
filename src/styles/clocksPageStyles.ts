import { AppTheme, defaultTheme } from '@/style';
import { css, keyframes } from '@emotion/react';
import { media } from '@/rwd';
import { ThemeMode } from '@/types/themeTypes';
import type { ClockNumeralStyleProps, ClockMarkerStyleProps } from '@/types/clockTypes';

/**
 * Emotion CSS style for the clocks grid container.
 * 
 * Defines a vertically stacked grid layout with named grid areas for each clock and a logout section.
 */
export const baseLayoutStyle = css({
	display: 'grid',
	height: '100vh',
	width: '100cqi',   // Responsive width using container query units
	maxWidth: '800px', // Max width to prevent stretching on large screens
	justifyItems: 'center',
	gridTemplateAreas: `
		'.'
		'lv'
		'tpe'
		'logout'
	`,
});

/**
 * Emotion CSS style for mobile devices in landscape orientation.
 * 
 * Defines a 2-column grid layout for displaying the clock components side-by-side.
 */
export const mobileLandscapeStyle = media.mobileLandscape.css({
	gridTemplateAreas: `
		'.      .'
		'lv     tpe'
		'logout logout'
		'.      .'
	`,
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(4, 1fr)',
	rowGap: '4cqi'
});

/**
 * Responsive style for ultra-small screens (i.e. narrow mobile like iPhone SE).
 * Adjusts grid row sizes and removes vertical spacing to optimize layout for limited screen real estate.
 */
export const ultraSmallStyle = media('(max-width: 392px)', {
	gridTemplateRows: '13cqi 4fr 4fr 1.5fr',
	rowGap: 0,
});

/**
 * Emotion CSS style for an analog clock face.
 * 
 * This wrapper defines a circular grid container with 3 equal rows,
 * clips overflowing content, and applies a theme-specific background color.
 */
export const clockWrapperStyle = (theme: AppTheme) => css({
	aspectRatio: 1,
	borderRadius: '50%', // Makes the wrapper circular
	display: 'grid',
	gridTemplateRows: 'repeat(3, 1fr)', // Splits clock face into 3 rows for positioning
	inlineSize: '100%',
	overflow: 'clip',
	position: 'relative',
	background: theme.clockColors.background,
	transition: 'background 0.3s ease',
	fontFamily: theme.fontFamily,
	color: theme.clockColors.color || 'inherit',
});

/**
 * Emotion CSS style for the container of clock hands.
 * 
 * This style positions the hands within the central grid cell of the clock face,
 * and includes a styled center dot using a pseudo-element.
 */
export const handsStyle = (theme: AppTheme, isClassic: boolean) => css({
	display: 'grid',
	gridArea: '2 / 1 / 3 / 1',             // Place the hands container in the middle row of the clock grid
	gridTemplateColumns: 'repeat(3, 1fr)',
	...(!isClassic && {
		'&::after': {                          // Add a center dot using a pseudo-element
			content: '""',
			aspectRatio: 1,                      // Ensure the dot is perfectly round
			borderRadius: '50%',                 // Make it circular
			gridArea: '1 / 2 / 1 / 3',           // Place it in the middle column
			height: '5cqi',                      // Responsive size based on container
			isolation: 'isolate',                // Prevent stacking context issues
			zIndex: 10,                          // Ensure it appears above other elements
			placeSelf: 'center',
			backgroundColor: theme.clockColors.centerDotColor,
		},
	}),
});

/**
 * Emotion CSS style for a clock hand element (hour, minute, or second).
 * 
 * This style positions the hand absolutely in the center of the clock face
 * and uses CSS variables (`--_h` for height and `--_w` for width) to control sizing.
 * Each hand can be rotated and animated independently using this shared foundation.
 */
export const handBaseStyle = () => css({
	display: 'block',
	position: 'absolute',
	height: 'var(--_h)',                  // Height of the hand, controlled via a CSS variable
	left: 'calc((100% - var(--_w)) / 2)', // Horizontally center the hand by offsetting half of its width
	top: 'calc((100% / 2) - var(--_h))',  // Vertically align the base of the hand to the center of the clock
	transform: 'rotate(0deg)',            // Default rotation, updated dynamically via inline styles
	transformOrigin: 'bottom',            // Rotate around the bottom (base) of the hand
	width: 'var(--_w)',                   // Width of the hand, controlled via a CSS variable
});

/**
 * Reusable keyframe for continuous rotation.
 */
const turn = keyframes`
	to {
		transform: rotate(1turn);
	}
`;

/**
 * Emotion CSS style for the second hand of the analog clock.
 * 
 * Uses a CSS animation to rotate continuously every 60 seconds,
 * with optional delay controlled by `--_ds`.
 * The hand is narrow and long, layered above the other hands.
 */
export const secondHandStyle = (theme: AppTheme, isClassic: boolean) => css({
	'--_h': '40%',                            // Height of the second hand as a percentage of the clock
	'--_w': '0.8cqi',                         // Width of the second hand
	animation: `${turn} 60s linear infinite`, // Rotates the hand continuously over 60 seconds
	animationDelay: 'var(--_ds, 0ms)',        // Optional delay to sync with actual seconds
	zIndex: 3,                                // On top of the other hands
	backgroundColor: theme.clockColors.secondHandColor,
	...(isClassic && {
		'&::before': {
			backgroundColor: theme.mode === 'light' ? defaultTheme.colors.white : defaultTheme.colors.blackishGray,
			border: `1cqi solid ${theme.mode === 'light' ? defaultTheme.colors.blackishGray : defaultTheme.colors.white}`,
			borderRadius: '50%',
			content: '""',
			display: 'block',
			height: '4cqi',
			position: 'absolute',
			bottom: '-3cqi',
			left: '-2.5cqi',
			width: '4cqi',
		},
	}),
});

/**
 * Emotion CSS style for the minute hand of the analog clock.
 * 
 * Applies a stepped animation that completes one full rotation every 60 minutes (3600s),
 * mimicking real-world ticking behavior with 60 discrete steps.
 * The color and theme are dynamically derived from the current theme context.
 */
export const minuteHandStyle = (theme: AppTheme) => css({
	'--_h': '30%',                                      // Height of the minute hand
	'--_w': '1.5cqi',                                   // Width of the minute hand
	animation: `${turn} 3600s steps(60, end) infinite`, // Stepped animation for ticking once per minute
	animationDelay: 'var(--_dm, 0ms)',                  // Delay to sync with actual minutes
	zIndex: 2,                                          // Renders above the hour hand, below the second hand
	backgroundColor: theme.clockColors.handColor,
	borderRadius: theme.mode === 'luxury' ? '25%' : '0%',
});

/**
 * Emotion CSS style for the hour hand of the analog clock.
 * 
 * The hour hand rotates once every 12 hours (43200 seconds),
 * using a smooth linear animation for continuous motion.
 * Its color is theme-aware and it appears behind the minute and second hands.
 */
export const hourHandStyle = (theme: AppTheme) => css({
	'--_h': '20%',                               // Height of the hour hand
	'--_w': '1.5cqi',                            // Width of the hour hand
	animation: `${turn} 43200s linear infinite`, // Smooth rotation every 12 hours
	animationDelay: 'var(--_dh, 0ms)',           // Syncs with the correct hour position
	zIndex: 1,                                   // Lowest z-index among hands
	backgroundColor: theme.clockColors.handColor,
	borderRadius: theme.mode === 'luxury' ? '25%' : '0%',
});

/**
 * Emotion CSS style for the hour and minute hands when the clock face is set to classic.
 */
export const classicHandStyle = (theme: AppTheme, isClassic: boolean) => css({
	...(isClassic && {
		backgroundColor: theme.mode === 'light' ? defaultTheme.colors.blackishGray : defaultTheme.colors.white,
		borderRadius: '25%',
	}),
});

/**
 * Emotion CSS style for the clock container.
 * 
 * This sets up a responsive, square container using CSS Container Queries
 * to adapt to available inline size. It centers the clock content both
 * horizontally and vertically and maintains a consistent aspect ratio.
 */
export const clockContainerStyle = css({
	containerType: 'inline-size',       // Enables container query support based on inline size
	containerName: 'clock',             // Named container for targeted container queries
	width: 'clamp(160px, 61vw, 320px)', // Responsive width that clamps between 160px and 320px
	aspectRatio: 1,                     // Maintains a square shape
	margin: '0 auto',                   // Horizontally centers the container
	display: 'grid',
	placeItems: 'center',
});

/**
 * Emotion CSS style override for mobile landscape orientation.
 *
 * Applies a fixed width to ensure better layout consistency
 * when the device is in landscape mode on smaller screens.
 */
export const clockMobileLandscapeStyle = media.mobileLandscape.css({
	width: '240px',
});

/**
 * Emotion CSS style for the label text displayed below each analog clock.
 */
export const labelStyle = (theme: AppTheme, mode: ThemeMode) => css({
	gridArea: '2 / 1 / 3 / 2', // Places label in the center cell
	placeSelf: 'end center',   // Aligns label at the bottom center
	fontSize: '6cqi',          // Responsive font size based on container
	fontWeight: 600,
	color: mode === 'luxury' ? theme.clockColors.color : theme.clockColors.tickColor,
});

/**
 * Emotion CSS style for the tick marks container on the analog clock.
 * 
 * - Maintains a circular shape and centered layout within its grid cell.
 * - Ensures ticks are positioned relative to the center of the clock face.
 */
export const ticksWrapperStyle = css({
	position: 'relative',
	aspectRatio: 1,            // Keeps the container square
	borderRadius: '50%',       // Makes the container circular
	boxSizing: 'border-box',   // Includes border and padding in element's total size
	gridArea: '1 / 1 / 4 / 1', // Spans vertically across the grid to overlay within clock
	placeSelf: 'center',
	width: '100%',
	margin: 0,
	padding: 0,
});

/**
 * Emotion CSS style for a single clock tick mark based on the current theme.
 * 
 * - Each tick is absolutely positioned and rotated to match the correct angle.
 * - Positioned from the center of the clock face and translated outward.
 * - Uses CSS custom property `--_angle` to set rotation dynamically.
 */
export const tickStyle = (theme: AppTheme) => css({
	position: 'absolute',
	top: '50%',                                           // Start from the vertical center
	left: '50%',                                          // Start from the horizontal center
	width: '1cqi',                                        // Width of tick mark
	height: '8cqi',                                       // Height of tick mark
	transform: 'rotate(var(--_angle)) translateY(-580%)', // Rotate and move outward
	transformOrigin: 'top center',                        // Rotate around the top center point
	backgroundColor: theme.clockColors.tickColor,
});

/**
 * Defines the base CSS for the wrapper (`<ol>`) that holds all the clock numerals.
 * 
 * Behavior and Layout:
 * - Positions the numerals layer over the clock using `gridArea: '1 / 1 / 4 / 1'`.
 * - Adds a small outer margin (`1ch`) to slightly inset the numerals inside the clock edge.
 * - Removes default list styling (`padding: 0`) and ensures no browser default margins interfere.
 * - Uses `position: relative` to allow child numerals to be absolutely positioned around the clock face.
 */
export const numeralsWrapperStyle = css({
	gridArea: '1 / 1 / 4 / 1',
	margin: '0.5ch',
	padding: 0,
	position: 'relative',
});

/**
 * Generates a CSS-in-JS style object for clock numerals based on mode and rotation angle.
 *
 * The style places the numeral at a position on the clock face based on the provided angle (`deg`),
 * using trigonometric calculations for positioning (`--_x` and `--_y`). The color is determined
 * based on the mode, which can be 'luxury', 'light', or 'dark'. The numeral is styled with a bold font
 * and is placed using a CSS Grid for easy centering within its container.
 * 
 * CSS Custom Properties used:
 * - `--_r`: Radius of the circle (half the clock face size minus half the numeral size).
 * - `--_x`: X-coordinate position calculated as center + radius × cos(angle).
 * - `--_y`: Y-coordinate position calculated as center + radius × sin(angle).
 */
export const numeralStyle = ({ mode, deg }: ClockNumeralStyleProps) => css({
	'--_r': 'calc((100% - 15cqi) / 2)',
	'--_x': `calc(var(--_r) + (var(--_r) * cos(${deg}deg)))`,
	'--_y': `calc(var(--_r) + (var(--_r) * sin(${deg}deg)))`,
	aspectRatio: 1,
	display: 'grid',
	fontSize: '7cqi',
	fontWeight: 700,
	left: 'var(--_x)',
	placeContent: 'center',
	position: 'absolute',
	top: 'var(--_y)',
	width: '15cqi',
	fontStyle: 'normal',
	color: mode === 'luxury' || mode === 'light'
		? defaultTheme.colors.blackishGray : defaultTheme.colors.white,
});

/**
 * Defines the base CSS for the wrapper (`<ul>`) that holds all clock face markers.
 * 
 * Behavior and Layout:
 * - Creates a perfect circle using `aspectRatio: 1` and `borderRadius: 50%`.
 * - Positions the wrapper to fill and center itself inside the clock using `gridArea` and `placeSelf`.
 * - Removes default list styles (`listStyle: none`, `margin: 0`, `padding: 0`).
 * - Sets `boxSizing: border-box` to ensure padding and borders are included in width/height.
 * - Uses `fontSize: 6cqi` to scale marker size responsively.
 * - `width: 100%` ensures the wrapper fits its parent container.
 */
export const markersWrapperStyle = css({
	aspectRatio: 1,
	borderRadius: '50%',
	boxSizing: 'border-box',
	gridArea: '1 / 1 / 4 / 1',
	margin: 0,
	padding: 0,
	placeSelf: 'center',
	width: '100%',
	fontSize: '6cqi',
	listStyle: 'none',
});

/**
 * Generates the CSS for a single clock marker based on its position, the current theme mode, 
 * and whether it represents an hour marker.
 * 
 * Behavior:
 * - Positions the marker around the clock face using `offsetDistance` and `offsetPath: content-box`.
 * - Styles hour markers (`isHourMark: true`) to be bolder (`fontWeight: 800`) than normal minute markers.
 * - Adjusts color based on the `mode` (light, dark, or default) and whether it is an hour marker.
 */
export const markerStyle = ({ percentage, mode, isHourMark }: ClockMarkerStyleProps) => css({
	display: 'inline-block',
	listStyle: 'none',
	fontStyle: 'normal',
	offsetDistance: percentage,
	offsetPath: 'content-box',
	width: 'fit-content',
	fontWeight: isHourMark ? 800 : 400,
	color: mode === 'light' && isHourMark
		? defaultTheme.colors.darkGray
		: mode === 'dark' && !isHourMark
			? defaultTheme.colors.darkGray
			: defaultTheme.colors.softBlue,
});

/**
 * Emotion CSS style for the icon inside the theme toggle button.
 */
export const themeToggleIconStyle = css({
	width: '100%',
	height: 'auto',
	aspectRatio: 1,
	display: 'block',
});

/**
 * Emotion CSS style for the theme slide button.
 *
 * This style defines the appearance and layout of a circular button used
 * for toggling between light and dark themes. It uses responsive sizing
 * with `clamp` and `cqi` units for consistent UI across devices. The button
 * is positioned absolutely in the top-right corner of its container.
 */
export const slideButtonWrapperStyle = (disabled: boolean) => css({
	position: 'absolute',
	top: '1cqi',
	right: '1cqi',
	display: 'inline-block',
	width: 'clamp(48px, 8cqi, 72px)',
	height: 'clamp(24px, 4cqi, 36px)',
	cursor: 'pointer',
	visibility: disabled ? 'hidden' : 'visible',
	input: {
		opacity: 0,
		width: 0,
		height: 0,
		position: 'absolute',
		'&:checked + .slider .knob': {
			transform: 'translateX(70%) translateY(-50%)',
		},
	},
});

/**
 * Emotion CSS styles for the theme toggle slider.
 *
 * The slider shows both sun and moon icons on opposite sides and changes background color
 * depending on the current theme mode. It also includes a knob that slides smoothly.
 */
export const getSliderStyle = (isDark: boolean) => css({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	height: '100%',
	backgroundColor: isDark ? defaultTheme.colors.black : defaultTheme.colors.lightBlue,
	borderRadius: '999px',
	transition: 'background-color 0.3s ease',
	'.icon': {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '45%',
		height: '100%',
		pointerEvents: 'none',
		svg: {
			width: '70%',
			height: '70%',
		},
	},
	'.sun': {
		justifyContent: 'flex-start',
	},
	'.moon': {
		justifyContent: 'flex-end',
	},
	'.knob': {
		position: 'absolute',
		top: '50%',
		left: '15%',
		transform: 'translateX(-30%) translateY(-50%)',
		width: '50%',
		height: '100%',
		aspectRatio: '1',
		backgroundColor: defaultTheme.colors.white,
		borderRadius: '50%',
		transition: 'transform 0.3s ease',
		pointerEvents: 'none',
	},
});

/**
 * Emotion CSS styles for the theme toggle knob.
 * 
 * The knob reflects the current theme state and responds to hover and active
 * interactions with subtle 3D-like and pressed-in effects.
 */
export const getKnobStyle = (isDark: boolean) => css({
	position: 'absolute',
	top: '50%',
	left: isDark ? '1.5rem' : '0.25rem',
	transform: 'translateY(-50%)',
	width: '1.25rem',
	height: '1.25rem',
	borderRadius: '50%',
	backgroundColor: isDark ? '#333' : '#fff',
	boxShadow: `
		0 2px 4px rgba(0, 0, 0, 0.3),
		inset 0 -1px 2px rgba(0, 0, 0, 0.1)
	`,
	transition: 'left 300ms ease, box-shadow 150ms ease, transform 100ms ease',
	cursor: 'pointer',

	'&:hover': {
		boxShadow: `
			0 4px 8px rgba(0, 0, 0, 0.4),
			inset 0 -2px 4px rgba(0, 0, 0, 0.2)
		`,
	},
	'&:active': {
		transform: 'translateY(-45%) scale(0.96)',
		boxShadow: `
			inset 0 2px 4px rgba(0, 0, 0, 0.3)
		`,
	},
});

/**
 * Emotion CSS style for the container of the logout button.
 *
 * - Uses CSS Container Queries for responsive sizing.
 * - Centers the button horizontally using flex layout.
 * - Defines a grid area placement (`logout`) for grid-based layouts.
 * - Maintains an aspect ratio of 1 and applies responsive width and height using `clamp`.
 */
export const logoutButtonContainerStyle = css({
	containerType: 'inline-size',
	display: 'flex',
	justifyContent: 'center',
	gridArea: 'logout',
	aspectRatio: 1,
	width: 'clamp(200px, 73.1cqi, 320px)',
	height: 'clamp(45px, 12.73cqi, 60px)',
	marginTop: '0.76cqi',
});

/**
 * Emotion CSS style applied to the logout button container in mobile landscape orientation.
 */
export const logoutButtonMobileLandscapeStyle = media.mobileLandscape.css({
	height: '50px',
	rowGap: '3cqi',
});

/**
 * Emotion CSS style for the backdrop overlay behind the floating clock face selector.
 */
export const backdropStyle = (open: boolean) => css({
	position: 'fixed',
	inset: 0,
	backgroundColor: open ? defaultTheme.colors.opaque : 'transparent',
	backdropFilter: open ? 'blur(4px)' : 'none',
	transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
	pointerEvents: open ? 'auto' : 'none',
	zIndex: 900,
});

/**
 * Styles the floating wrapper that holds the main button and option buttons.
 */
export const floatingWrapperStyle = (isDesktop: boolean) => css({
	position: 'fixed',
	top: '1rem',
	left: '1rem',
	display: 'flex',
	flexDirection: isDesktop ? 'row' : 'column',
	alignItems: 'center',
	gap: '0.75rem',
	zIndex: 1000,
	'@media (max-width: 600px)': {
		top: '0.5rem',
		left: '0.5rem',
		gap: '0.5rem',
	},
});

/**
 * Styles the main floating button used to toggle the clock face selector.
 */
export const floatingMainButtonStyle = css({
	width: '4rem',
	height: '4rem',
	backgroundColor: defaultTheme.colors.transparent,
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: 'none',
	cursor: 'pointer',
	boxShadow: `0 4px 12px ${defaultTheme.colors.opaque}`,
	fontSize: '1.5rem',
	transition: 'background-color 0.3s ease',
	'@media (max-width: 600px)': {
		width: '3rem',
		height: '3rem',
		fontSize: '1.25rem',
	},
});

/**
 * Styles the menu toggle icon based on open state.
 */
export const menuToggleStyle = (isOpen: boolean) => css({
	display: 'inline-block',
	transform: isOpen ? 'scale(1.5) translateY(2px)' : 'revert',
	fontSize: '1.8rem',
	color: defaultTheme.colors.blackishGray,
});

/**
 * Keyframe animation for a smooth, elastic slide-down effect.
 */
const slideDownElastic = keyframes`
	0% {
		transform: translateY(-30%) scale(0.7);
	}
	60% {
		transform: translateY(10%) scale(1.05);
	}
	80% {
		transform: translateY(-5%) scale(0.98);
	}
	100% {
		transform: translateY(0) scale(1);
	}
`;

/**
 * Keyframe animation for an upward exit with an elastic bounce effect.
 */
const slideUpElastic = keyframes`
	0% {
		transform: translateY(0) scale(1);
		opacity: 0;
	}
	20% {
		transform: translateY(-5%) scale(0.98);
	}
	40% {
		transform: translateY(10%) scale(1.05);
	}
	100% {
		transform: translateY(-30%) scale(0.7);
		opacity: 1;
	}
`;

/**
 * Emotion CSS style for each floating option button based on its state and animation timing.
 */
export const optionButtonStyle = (
	index: number,
	open: boolean,
	animating: boolean,
	delay: number,
	isActive: boolean,
) => css({
	width: '3.5rem',
	height: '3.5rem',
	backgroundColor: isActive ? defaultTheme.colors.lightBlue : defaultTheme.colors.white,
	color: isActive ? defaultTheme.colors.white : defaultTheme.colors.darkGray,
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	border: isActive ? 'none' : `1px solid ${defaultTheme.colors.softBlue}`,
	cursor: open || animating ? 'pointer' : 'default',
	boxShadow: `0 2px 6px ${defaultTheme.colors.opaque}`,
	opacity: 1,
	pointerEvents: open || animating ? 'auto' : 'none',
	transform: 'translateY(0)',
	transition: 'transform 0.3s ease, opacity 0.3s ease',
	animation: animating
		? `${open ? slideDownElastic : slideUpElastic} 0.7s cubic-bezier(0.25, 1.5, 0.5, 1) ${delay}ms forwards`
		: 'none',
	animationDelay: animating ? `${index * 0.1}s` : '0s',
	fontSize: '1.5rem',
	'@media (min-width: 1024px)': {
		opacity: 1,
		cursor: 'pointer',
		pointerEvents: 'auto',
		transform: 'translateY(0)',
		transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
		'&:hover': {
			transform: 'scale(1.08)',
		},
	},
	'@media (max-width: 600px)': {
		width: '3rem',
		height: '3rem',
		fontSize: '1.25rem',
	},
});

/**
 * Emotion CSS style for a diamond-themed analog clock face.
 *
 * - Decorative conic gradient rim effect using `::before` pseudo-element.
 * - Subtle shimmer animation to simulate reflective lighting.
 */
export const diamondClockFaceStyle = css({
	position: 'relative',
	width: 'clamp(160px, 61vw, 320px)',
	borderRadius: '50%',
	boxShadow: `
		inset 0 0 10px rgba(255,255,255,0.6),
		0 0 25px rgba(255,255,255,0.4),
		0 0 10px 2px rgba(173, 216, 230, 0.5)
	`,
	backgroundClip: 'padding-box',
	'&::before': {
		content: '""',
		position: 'absolute',
		inset: '-8px',
		borderRadius: '50%',
		background: `
			repeating-conic-gradient(
				from 0deg,
				#fff 0deg 2deg,
				#ccc 2deg 4deg,
				#eee 4deg 6deg,
				#bbb 6deg 8deg
			)
		`,
		boxShadow: `
			0 0 10px rgba(255,255,255,0.8),
			inset 0 0 6px rgba(255,255,255,0.6)
		`,
		zIndex: -1,
		animation: 'shimmer 5s linear infinite',
	},

	// Shine animation
	'@keyframes shimmer': {
		'0%': { filter: 'brightness(1)' },
		'50%': { filter: 'brightness(1.2)' },
		'100%': { filter: 'brightness(1)' },
	},
});

/**
 * Responsive style for the clock face when viewed on mobile devices in landscape orientation.
 * 
 * This ensures the clock scales appropriately and remains visually consistent in horizontal layouts.
 */
export const clockFaceMobileLandscapeStyle = media.mobileLandscape.css({
	width: '240px',
});

/**
 * Emotion CSS style for rendering the day number inside the clock face.
 */
export const dateDayStyle = css({
	backgroundColor: defaultTheme.colors.white,
	color: defaultTheme.colors.black,
	fontSize: '6cqi',
	fontFamily: `'Figtree', sans-serif`,
	gridArea: '1 / 3 / 1 / 4',
	padding: '0 .6ch',
	placeSelf: 'center start',
});
