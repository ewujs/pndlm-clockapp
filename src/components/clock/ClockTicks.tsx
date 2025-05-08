/** @jsxImportSource @emotion/react */
import React from 'react';
import { useAppSelector } from '@/redux/storeHooks';
import type { AppRootState } from '@/redux/store';
import { defaultTheme, darkTheme } from '@/style';
import { ticksWrapperStyle, tickStyle } from '@/styles/clocksPageStyles';

/**
 * Renders 12 tick marks around the analog clock face,
 * spaced evenly using CSS custom properties to rotate each tick.
 *
 * Uses the current theme from Redux state to determine styling.
 *
 * @component
 * @returns {React.ReactElement} A styled list of tick marks representing the clock's hour positions.
 */
const ClockTicks = (): React.ReactElement => {
	const { mode } = useAppSelector((state: AppRootState) => state.theme);
	const currentTheme = mode === 'light' ? defaultTheme : darkTheme;

	return (
		<ul css={ticksWrapperStyle}>
			{Array.from({ length: 12 }).map((_, i) => {
				const angle = `${(360 / 12) * i}deg`;  // Calculate the angle for each hour mark
				return (
					<i
						css={tickStyle(currentTheme)}
						key={i}
						style={{ '--_angle': angle } as React.CSSProperties}
					/>
				);
			})}
		</ul>
	);
};

export default ClockTicks;
