/** @jsxImportSource @emotion/react */
import React from 'react';
import type { GridProps } from '@/types/commonTypes';
import { useOrientation, useBreakpoint, rwd } from '@/rwd';
import { baseLayoutStyle, mobileLandscapeStyle, ultraSmallStyle } from '@/styles/clocksPageStyles';

/**
 * A responsive layout wrapper for the analog clocks and logout button.
 * It adjusts its grid structure dynamically based on screen size and orientation using custom RWD utilities.
 *
 * The component:
 * - Uses `rwd()` to define breakpoints for xs, sm, md, and portrait modes.
 * - Applies specific grid layouts for mobile landscape and ultra-small screen widths.
 * - Accepts children which are typically ClockItems and LogoutSection.
 *
 * @component
 * @param {GridProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed within the grid (e.g., ClockItem components).
 * @returns {React.ReactElement} A div styled with responsive CSS grid layout.
 */
const ClocksGrid = ({ children }: GridProps): React.ReactElement => {
	const orientation = useOrientation();
	const activeBreakpoint = useBreakpoint();

	/**
	 * Responsive layout style object generated using the `rwd` utility.
	 * Defines how the grid layout of the clocks page adjusts across breakpoints (xs, sm, md) 
	 * and orientation (portrait mode).
	 */
	const rwdStyle = rwd({
		xs: {
			gridTemplateRows: '11.96cqi 4fr 4fr 3fr',
			rowGap: '14.5cqi',
		},
		sm: {
			gridTemplateRows: '1fr 4fr 4fr 2fr',
		},
		md: {
			gridTemplateAreas: `
				'.      .'
				'lv     tpe'
				'logout logout'
				'.      .'
			`,
			gridTemplateColumns: 'repeat(2, 1fr)',
			gridTemplateRows: '5fr 4fr 4fr 3fr',
			rowGap: '8cqi',
		},
		// Portrait layout for medium+ screens
		portrait: ['md', 'lg', 'xl'].includes(String(activeBreakpoint)) && orientation === 'portrait' && {
			gridTemplateAreas: `
				'.'
				'lv'
				'tpe'
				'logout'
			`,
			gridTemplateColumns: 'none',
			gridTemplateRows: '1.5fr 3fr 3fr 2.5fr',
			rowGap: '9cqi',
		},
	});

	return (
		<div css={[baseLayoutStyle, rwdStyle, mobileLandscapeStyle, ultraSmallStyle]}>
			{children}
		</div>
	);
};

export default ClocksGrid;
