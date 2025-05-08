/** @jsxImportSource @emotion/react */
import React from 'react';
import { themeToggleIconStyle } from '@/styles/clocksPageStyles';
import { defaultTheme } from '@/style';

/**
 * Renders an SVG representing the sun, used as an icon for light mode.
 *
 * @component
 * @returns {React.ReactElement} The rendered SVG icon element.
 */
const SunIcon = (): React.ReactElement => {
	return (
		<svg
			css={themeToggleIconStyle}
			viewBox="0 0 24 24"
			fill="none"
			stroke={defaultTheme.colors.yellow}
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="6" fill={defaultTheme.colors.yellow} />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>
	);
};

export default SunIcon;
