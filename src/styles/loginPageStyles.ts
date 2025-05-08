import { css, keyframes } from '@emotion/react';
import type { EllipseProps } from '@/types/commonTypes';
import { defaultTheme } from '../style';
import { media } from '@/rwd';

/**
 * Emotion CSS style for a wrapper container that holds 3 ellipses.
 * 
 * This wrapper is positioned absolutely to cover the full viewport.
 * It hides any overflow and places the container behind other content with a negative z-index.
 */
export const ellipsesWrapperStyle = css({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	zIndex: -1,
});

/**
 * Emotion CSS style for an ellipse shape using viewport width (vw) units.
 */
export const ellipseStyle = (props: EllipseProps) => css({
	position: 'absolute',
	width: `${props.widthVW}vw`,
	height: `${props.widthVW / props.aspectRatio}vw`, // Calculate height based on aspect ratio
	top: `${props.topVW}vw`,
	left: `${props.leftVW}vw`,
	borderRadius: '50%',
	backgroundColor: defaultTheme.colors.blue,
	opacity: 0.2,
});

/**
 * Emotion CSS style for a button element.
 */
export const buttonBaseStyle = css({
	width: '100%',
	color: defaultTheme.colors.white,
	marginTop: 'var(--_mt)',
	border: 'none',
	borderRadius: '15px',
	fontSize: '5.575cqi',
	fontWeight: 500,
	fontFamily: ['Figtree', 'sans-serif'].join(', '),
	cursor: 'pointer',
	transition: 'background 0.3s ease',
	background: defaultTheme.colors.red,
	'&:hover': {
		background: 'var(--_hover-bg)',
	},
});

/**
 * Emotion CSS style for the logo container.
 *
 * Applies a flex container to center its content horizontally.
 * Positioned within a CSS Grid area named "logo".
 */
export const logoContainerStyle = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	gridArea: 'logo',
	alignSelf: 'baseline',
});

/**
 * Emotion CSS style for the logo image element.
 */
export const logoStyle = css({
	width: 'clamp(281.63px, 41vw, 320px)', // responsive width
	height: 'auto',
	maxWidth: '100%', // prevents overflow
});

/**
 * Emotion CSS style for the login form wrapper.
 *
 * Applies a column flex layout with spacing and positioning for grid alignment.
 * The form is centered and positioned in the grid area named 'loginForm'.
 */
export const formWrapperStyle = css({
	display: 'flex',
	flexDirection: 'column',
	width: 'fit-content',
	justifySelf: 'center',
	rowGap: '6.11cqi',
	position: 'relative',
	gridArea: 'loginForm',
});

/**
 * Emotion CSS style for the login form in mobile landscape view.
 *
 * Adjusts the form layout for mobile landscape by setting width to 'unset',
 * centering it horizontally, reducing the row gap, and adding padding at the top.
 */
export const formMobileLandscapeStyle = media.mobileLandscape.css({
	width: 'unset',
	justifySelf: 'center',
	rowGap: '1.5cqi',
	paddingTop: '3cqi',
});

/**
 * Emotion CSS style for the login form on tablet-sized screens (min-width: 768px).
 *
 * Adjusts the row gap between form elements to 2cqi for better spacing on tablet devices.
 */
export const formTabletStyle = media('(min-width: 768px)', {
	rowGap: '2cqi',
});

/**
 * Emotion CSS style for the login form on ultra-small landscape screens (e.g. iPhone SE).
 * 
 * Adjusts the padding on the top of the form to 6cqi when the screen is in landscape orientation and the width is small.
 */
export const formUltralSmallLandscapeStyle = media.and({ maxWidth: 667, orientation: 'landscape' }).css({
	paddingTop: '6cqi',
});

/**
 * Emotion CSS style for the wrapper around individual form fields.
 * 
 * Positions the wrapper relative to its normal position, allowing absolute positioning of child elements if needed.
 */
export const formFieldWrapperStyle = css({
	position: 'relative',
});

export const labelStyle = css({
	display: 'block',
	textAlign: 'left',
	fontSize: defaultTheme.fontSizes.small,
	fontWeight: 600,
	color: defaultTheme.colors.white,
	marginBottom: '3px',
});

/**
 * Emotion CSS style for the base input field.
 */
export const inputBaseStyle = css({
	width: '253px',
	padding: '14px 16px',
	border: `1px solid ${defaultTheme.colors.green}`,
	borderRadius: '15px',
	fontSize: '15px',
	fontFamily: ['Figtree', 'sans-serif'].join(', '),
	'&:focus': {
		outline: 'none',
		borderColor: defaultTheme.colors.green,
	},
	'&:disabled': {
		backgroundColor: defaultTheme.colors.lightGray,
		color: defaultTheme.colors.softBlue,
		cursor: 'not-allowed',
	}
});

/**
 * Emotion CSS style for the input field on tablet-sized screens.
 */
export const inputTabletStyle = media('(min-width: 768px)', {
	width: '286px',
	padding: '16px 18px',
	fontSize: '16px',
});

/**
 * Emotion CSS style for the input field on desktop-sized screens.
 */
export const inputDesktopStyle = media('(min-width: 1024px)', {
	fontSize: '18px',
});

/**
 * Emotion CSS style for the container of the eye icon used to toggle password visibility.
 */
export const eyeIconContainerStyle = css({
	position: 'absolute',
	right: '17px',
	top: '68%',
	transform: 'translateY(-50%)', // Vertically centers it relative to the input
	cursor: 'pointer',
});

/**
 * Responsive style for the eye icon container on tablet screens.
 */
export const eyeIconContainerTabletStyle = media('(min-width: 768px)', {
	right: '19px',
});

/**
 * Emotion CSS style for the eye icon used to toggle password visibility.
 */
export const eyeIconStyle = css({
	width: '20px',
	height: '16px',
});

/**
 * Emotion CSS style for the "Forgot Password" link.
 * 
 * This style is used to position and style the "Forgot Password" link within the login form.
 */
export const forgotPasswordLinkStyle = css({
	position: 'relative',
	marginTop: '-16px',
	left: '168px',
	fontSize: defaultTheme.fontSizes.small,
	fontWeight: 700,
	color: defaultTheme.colors.white,
	cursor: 'pointer',
	lineHeight: '22px',
	display: 'inline-block',
	width: 'fit-content',
	maxWidth: '100%',
});

/**
 * Emotion CSS style for the "Forgot Password" link in mobile landscape view.
 */
export const forgotPasswordMobileLandscapeStyle = media.mobileLandscape.css({
	marginTop: '-1cqi',
	lineHeight: '2.6cqi',
});

/**
 * Emotion CSS style for the "Forgot Password" link on tablet-sized screens.
 */
export const forgotPasswordTabletStyle = media('(min-width: 768px)', {
	left: '204px',
});

/**
 * Emotion CSS style for the "Forgot Password" link on desktop-sized screens.
 */
export const forgotPasswordDesktopStyle = media('(min-width: 1280px)', {
	left: '188px',
});

/**
 * Emotion CSS style for the checkbox label in the login form.
 *
 * This style positions and styles the label next to the custom checkbox,
 * including spacing, cursor behavior, font appearance, and user interaction.
 */
export const checkboxLabelStyle = css({
	position: 'relative',
	top: 0,
	height: '20px',
	paddingLeft: '44px',
	cursor: 'pointer',
	fontSize: defaultTheme.fontSizes.medium,
	fontWeight: 500,
	userSelect: 'none',
	width: 'fit-content',
	display: 'inline-block',
	maxWidth: '100%',
});

/**
 * Emotion CSS style for a hidden checkbox input used in a custom-styled checkbox component.
 *
 * This input is visually hidden but still accessible, and its state is used to style
 * the accompanying `.checkmark` element via sibling selectors.
 */
export const checkboxInputStyle = css({
	position: 'absolute',
	opacity: 0,
	cursor: 'pointer',
	height: 0,
	width: 0,
	'&:hover ~ .checkmark': {
		backgroundColor: defaultTheme.colors.softBlue,
	},
	'&:checked ~ .checkmark': {
		backgroundColor: defaultTheme.colors.white,
	},
	'&:checked ~ .checkmark:after': {
		display: 'block',
	}
});

/**
 * Emotion CSS style for the custom-styled checkbox checkmark element.
 *
 * This style creates the visible checkbox box and its optional tick mark,
 * which is shown when the associated checkbox input is checked.
 */
export const checkmarkStyle = css({
	position: 'absolute',
	top: 0,
	left: '8px',
	height: '20px',
	width: '20px',
	backgroundColor: defaultTheme.colors.white,
	borderRadius: '7px',
	'&:after': {
		content: '""',
		position: 'absolute',
		display: 'none',
		left: '6px',
		top: '2px',
		width: '5px',
		height: '10px',
		border: `solid ${defaultTheme.colors.green}`,
		borderWidth: '0 3px 3px 0',
		transform: 'rotate(45deg)',
	},
});

/**
 * Emotion CSS style for the container of the login button.
 */
export const loginBottonContainerStyle = css({
	containerType: 'inline-size',
	display: 'flex',
	justifyContent: 'center',
	aspectRatio: 1,
	width: '287px',
	height: '50px',
	marginTop: '12.54cqi',
});

/**
 * Emotion CSS style for the login button container in mobile landscape view.
 */
export const loginBottonMobileLandscapeStyle = media.mobileLandscape.css({
	height: '50px',
	marginTop: '3cqi',
});

/**
 * Emotion CSS style for the login button container in ultra-small screen sizes.
 */
export const loginBottonUltraSmallStyle = media('(max-width: 392px)', {
	width: '287px',
});

/**
 * Emotion CSS style for the login button container on tablet-sized screens.
 */
export const loginButtonTabletStyle = media('(min-width: 768px)', {
	width: '320px',
	height: '55px',
});

/**
 * Emotion CSS style for the login button container on desktop-sized screens.
 */
export const loginBottonDesktopStyle = media('(min-width: 1280px)', {
	marginTop: '3cqi',
});

/**
 * Emotion CSS style for the text block of the registration link on the login form page.
 */
export const registerTextStyle = css({
	position: 'relative',
	paddingTop: '28.75cqi',
	margin: 0,
	textAlign: 'center',
	fontSize: defaultTheme.fontSizes.small,
	fontWeight: 500,
	color: defaultTheme.colors.white,
	lineHeight: '22px',
	width: '287px',
	'> a': {
		fontWeight: 700,
		color: defaultTheme.colors.white,
	},
});

/**
 * Emotion CSS style for the text block of the registration link on tablet-sized screens.
 */
export const registerTextTabletStyle = media('(min-width: 768px)', {
	padding: 0,
	width: '320px',
});

/**
 * Emotion CSS style for the text block of the registration link in mobile landscape view.
 */
export const registerTextMobileLandscapeStyle = media.mobileLandscape.css({
	paddingTop: 0,
	margin: 0,
});

/**
 * Emotion CSS style for the text block of the registration link in ultra-small screen sizes.
 */
export const registerTextUltraSmallStyle = media('(max-width: 392px)', {
	padding: '12.21cqi 0',
});

const errorSlideFadeIn = keyframes({
	from: { opacity: 0, transform: 'translate(-50%, -1rem)' },
	to: { opacity: 1, transform: 'translate(-50%, 0)' },
});

const errorFadeOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

/**
 * Emotion CSS style for the base appearance of error messages.
 *
 * Positions the error message fixed at the top center of the viewport,
 * with styling for visibility and emphasis including background color,
 * padding, border radius, shadow, and flex layout for content alignment.
 */
export const errorBaseStyle = css({
	position: 'fixed',
	top: '1.5rem',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '0.75rem 1.5rem',
	backgroundColor: defaultTheme.colors.pinkishRed,
	color: defaultTheme.colors.white,
	fontWeight: 600,
	borderRadius: '0.5rem',
	boxShadow: `0 0 10px ${defaultTheme.colors.opaque}`,
	zIndex: 9999,
	maxWidth: '80%',
	textAlign: 'center',
	display: 'flex',
	alignItems: 'center',
	gap: '2rem',
	fontSize: defaultTheme.fontSizes.medium,
});

/**
 * Emotion CSS style for the close button within an error message component.
 */
export const errorCloseButtonStyle = css({
	marginLeft: 'auto',
	background: 'transparent',
	border: 'none',
	color: defaultTheme.colors.white,
	cursor: 'pointer',
	fontSize: '1.25rem',
	fontWeight: 'bold',
	lineHeight: 1,
});

/**
 * Emotion CSS style for animating error message visibility.
 */
export const errorAnimationStyle = (visible: boolean) => css({
	animation: `${visible ? errorSlideFadeIn : errorFadeOut} 0.4s ease`,
	opacity: visible ? 1 : 0,
});

/**
 * Emotion CSS style for the error icon displayed in a floating error message.
 */
export const errorIconStyle = css({
	flexShrink: 0,
	width: '1.25rem',
	height: '1.25rem',
	marginRight: '0.5rem',
});
