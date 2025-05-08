/** @jsxImportSource @emotion/react */
import React from 'react';
import { defaultTheme } from '@/style';

/**
 * Renders an SVG representing an error state.
 * The icon is a red circle with a white exclamation mark.
 *
 * @component
 * @returns {React.ReactElement} A styled SVG error icon.
 */
const ErrorIcon = (): React.ReactElement => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="12" r="10" fill={defaultTheme.colors.pinkishRed} />
			<line x1="12" y1="8" x2="12" y2="12" stroke={defaultTheme.colors.white} />
			<circle cx="12" cy="16" r="1" fill={defaultTheme.colors.white} />
		</svg>
	);
};

export default ErrorIcon;
