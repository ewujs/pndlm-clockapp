/** @jsxImportSource @emotion/react */
import React from 'react';
import type { ClockProps } from '@/types/clockTypes';
import { useAppSelector } from '@/redux/storeHooks';
import { AppRootState } from '@/redux/store';
import { defaultTheme, themeMap } from '@/style';
import { getTimeInZone } from '@/utils';
import {
	handsStyle,
	handBaseStyle,
	secondHandStyle,
	minuteHandStyle,
	hourHandStyle,
	classicHandStyle,
} from '@/styles/clocksPageStyles';
import ClockDateDay from '@/components/clock/ClockDateDay';

/**
 * Renders the animated hands (hour, minute, second)
 * for a specific city's analog clock. The animation is driven by CSS custom properties
 * based on the current time in the specified timezone.
 *
 * @component
 * @param {ClockProps} props - The props for the component.
 * @param {SupportedCity} props.city - The key of the city (e.g., 'tpe' or 'lv') to display time for.
 * @returns {React.ReactElement} The rendered clock hands component.
 */
const ClockHands = ({ city }: ClockProps): React.ReactElement => {
	const { mode, clockFace } = useAppSelector((state: AppRootState) => state.theme);
	const currentTheme = themeMap[mode] || defaultTheme;
	const isClassic = clockFace === 'classic';

	const { now } = useAppSelector((state: AppRootState) => state.clock);
	const timeZone = useAppSelector((state: AppRootState) => {
		const clockData = state.clock[city];
		return typeof clockData === 'object' && 'timeZone' in clockData ? clockData.timeZone : '';
	});

	// Convert timestamp into hour, minutes, seconds for the city time zone
	const { hour, mins, secs } = getTimeInZone(now as number, timeZone);

	// Calculate animation delay so the hand positions reflect the current time
	const secsDelay = -secs;
	const minsDelay = -60 * mins;
	const hourDelay = -3600 * (hour % 12);

	return (
		<nav css={handsStyle(currentTheme, isClassic)}>
			<b css={[handBaseStyle, secondHandStyle(currentTheme, isClassic)]} style={{ '--_ds': `${secsDelay}s` } as React.CSSProperties}></b>
			<b css={[handBaseStyle, minuteHandStyle(currentTheme), classicHandStyle(currentTheme, isClassic)]} style={{ '--_dm': `${minsDelay}s` } as React.CSSProperties}></b>
			<b css={[handBaseStyle, hourHandStyle(currentTheme), classicHandStyle(currentTheme, isClassic)]} style={{ '--_dh': `${hourDelay + minsDelay}s` } as React.CSSProperties}></b>
			{mode === 'luxury' && <ClockDateDay timeZone={timeZone} />}
		</nav>
	);
};

export default ClockHands;