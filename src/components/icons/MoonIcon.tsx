/** @jsxImportSource @emotion/react */
import React from 'react';
import { themeToggleIconStyle } from '@/styles/clocksPageStyles';
import { defaultTheme } from '@/style';

/**
 * Renders an SVG representing the moon, used as an icon for dark mode.
 *
 * @component
 * @returns {React.ReactElement} The rendered SVG icon element.
 */
const MoonIcon = (): React.ReactElement => {
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
			<mask id="moon-mask">
				<rect width="100%" height="100%" fill={defaultTheme.colors.yellow} />
				<circle cx="16" cy="8" r="8" fill={defaultTheme.colors.black} />
			</mask>
			<circle cx="12" cy="12" r="6" fill={defaultTheme.colors.yellow} mask="url(#moon-mask)" />
		</svg>
	);
};

export default MoonIcon;
