/** @jsxImportSource @emotion/react */
import React from 'react';
import type { ClockProps } from '@/types/clockTypes';
import { useAppSelector } from '@/redux/storeHooks';
import { AppRootState } from '@/redux/store';
import { defaultTheme, themeMap } from '@/style';
import { clockWrapperStyle, diamondClockFaceStyle, clockFaceMobileLandscapeStyle } from '@/styles/clocksPageStyles';
import ClockNumerals from './ClockNumerals';
import ClockHands from './ClockHands';
import ClockLabel from './ClockLabel';
import ClockMarkers from './ClockMarkers';
import ClockTicks from './ClockTicks';

/**
 * Renders an analog-style clock UI for a given city.
 *
 * - It selects the current theme (light or dark) from the Redux state.
 * - Renders clock ticks, hands, and a city label using subcomponents.
 * - The clock's styling dynamically adapts based on the active theme.
 *
 * @component
 * @param {ClockProps} props - The props for the component.
 * @param {SupportedCity} props.city - The key for the city whose time will be displayed (e.g., 'tpe' for Taipei, 'lv' for Las Vegas).
 * @returns {React.ReactElement} The rendered analog clock component.
 */
const AnalogClock = ({ city }: ClockProps): React.ReactElement => {
	const { mode, clockFace } = useAppSelector((state: AppRootState) => state.theme);
	const currentTheme = themeMap[mode] || defaultTheme;
	const wrapperStyle = [clockWrapperStyle(currentTheme), clockFaceMobileLandscapeStyle] ;

	if (mode === 'luxury') {
		wrapperStyle.push(diamondClockFaceStyle);
	}

	return (
		<div css={wrapperStyle}>
			{clockFace === 'classic' && <ClockMarkers />}
			{clockFace === 'minimalist' ? <ClockTicks /> : <ClockNumerals />}
			<ClockHands city={city} />
			<ClockLabel city={city} />
		</div>
	);
};

export default AnalogClock;
