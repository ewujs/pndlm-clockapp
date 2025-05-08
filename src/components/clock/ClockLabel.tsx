/** @jsxImportSource @emotion/react */
import React from 'react';
import type { ClockProps } from '@/types/clockTypes';
import { useAppSelector } from '@/redux/storeHooks';
import { AppRootState } from '@/redux/store';
import { defaultTheme, themeMap } from '@/style';
import { labelStyle } from '@/styles/clocksPageStyles';

/**
 * Renders the city label beneath the analog clock.
 * It reads the `label` value from the Redux store based on the provided `city` key.
 * The label text color is styled according to the current theme (light or dark mode).
 *
 * @component
 * @param {ClockProps} props - The props for the component.
 * @param {SupportedCity} props.city - The city key (e.g., 'tpe', 'lv') used to fetch the corresponding label from the clock state.
 * @returns {React.ReactElement} A themed span element displaying the clock label.
 */
const ClockLabel = ({ city }: ClockProps): React.ReactElement => {
	// Selects the label text from Redux state using the city key
	const label = useAppSelector((state: AppRootState) => {
		const clockData = state.clock[city];
		return typeof clockData === 'object' && 'label' in clockData ? clockData.label : '';
	});
	const { mode } = useAppSelector((state: AppRootState) => state.theme);
	const currentTheme = themeMap[mode] || defaultTheme;

	return (
		<span css={labelStyle(currentTheme, mode)}>{label}</span>
	);
};

export default ClockLabel;
