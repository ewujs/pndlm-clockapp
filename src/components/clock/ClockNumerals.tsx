/** @jsxImportSource @emotion/react */
import React from 'react';
import { useAppSelector } from '@/redux/storeHooks';
import type { AppRootState } from '@/redux/store';
import { numeralsWrapperStyle, numeralStyle } from '@/styles/clocksPageStyles';

/**
 * Renders the numerals around an analog clock face using CSS positioning.
 * 
 * Behavior:
 * - Displays either **Roman numerals** ("XII", "III", "VI", "IX") or **standard numbers** (1–12) 
 *   depending on the current `theme.mode` from Redux state.
 * - Numerals are dynamically positioned around a circle using CSS and trigonometric functions (cosine and sine).
 * - Font color adapts based on the selected theme (`luxury`, `light`, or dark modes).
 *
 * @component
 * @returns {React.ReactElement} A styled ordered list of clock numerals.
 */
const ClockNumerals = (): React.ReactElement => {
	const { mode } = useAppSelector((state: AppRootState) => state.theme);
	const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
	const count = mode === 'luxury' ? 4 : 12;
	const step = 360 / count;

	return (
		<ol	css={numeralsWrapperStyle}>
			{[...Array(count)].map((_, i) => {
				const deg = ((i * step) + 270) % 360;
				const num = ((i * (12 / count))) % 12 || 12;
				return (
					<i
						key={`num-${i}`}
						css={numeralStyle({ mode, deg })}
					>
						{mode === 'luxury' ? romanNumerals[num - 1] : (i === 0 ? 12 : i)}
					</i>
				);
			})}
		</ol>
	);
};

export default ClockNumerals;
