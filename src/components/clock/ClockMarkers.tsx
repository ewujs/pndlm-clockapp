/** @jsxImportSource @emotion/react */
import React from 'react';
import { useAppSelector } from '@/redux/storeHooks';
import type { AppRootState } from '@/redux/store';
import { markersWrapperStyle, markerStyle } from '@/styles/clocksPageStyles';

/**
 * Renders 60 markers around the clock face to represent seconds or minute ticks.
 * 
 * Behavior:
 * - Uses Redux state `theme.mode` to adjust marker color depending on light, dark, or luxury themes.
 * - Renders 60 `<i>` elements inside a `<ul>`, each representing a second/minute marker.
 * - Every 5th marker (`i % 5 === 0`) is considered an **hour marker**, which can be styled differently.
 * - Markers are positioned evenly around the clock face based on a calculated percentage step.
 *
 * Variables:
 * - `count`: Number of markers to render (60 markers for full clock).
 * - `step`: Percentage of rotation between each marker (100% ÷ 60 = 1.666...% per marker).
 * - `marker`: Character/string used to render the visual tick (currently `'|'`).
 *
 * CSS:
 * - `percentage`: Defines where the marker is placed along the circumference.
 * - `isHourMark`: Boolean that allows hour markers (every 5th) to have special styling.
 *
 * @component
 * @returns {React.ReactElement} A styled unordered list containing clock face markers.
 */
const ClockMarkers = (): React.ReactElement => {
	const { mode } = useAppSelector((state: AppRootState) => state.theme);
	const count = 60; // Number of markers (60 for seconds)
	const step = 100 / count; // Step percentage for each marker
	const marker = '|';

	return (
		<ul css={markersWrapperStyle}>
			{[...Array(count)].map((_, i) => {
				const percentage = `${(i * step)}%`;
				const isHourMark = i % 5 === 0;
				return (
					<i
						key={`marker-${i}`}
						css={markerStyle({ percentage, mode, isHourMark })}
					>
						{marker}
					</i>
				);
			})}
		</ul>
	);
};

export default ClockMarkers;
