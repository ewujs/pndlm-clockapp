/** @jsxImportSource @emotion/react */
import React from 'react';
import type { ClockProps } from '@/types/clockTypes';
import { clockContainerStyle, clockMobileLandscapeStyle } from '@/styles/clocksPageStyles';
import AnalogClock from './AnalogClock';

/**
 * Represents a single analog clock placed in a responsive CSS grid layout.
 * The `city` prop determines both the time zone used in the clock and the grid area it occupies.
 *
 * @component
 * @param {ClockProps} props - The props for the component.
 * @param {SupportedCity} props.city - The city identifier (e.g., 'tpe' or 'lv') used to determine the clock's time zone and its grid area name.
 * @returns {React.ReactElement} A styled grid item containing an analog clock for the given city.
 */
const ClockItem = ({ city }: ClockProps): React.ReactElement => {
	return (
		<div
			css={[clockContainerStyle, clockMobileLandscapeStyle]}
			style={{ gridArea: city }} // Grid area name to place this item in the CSS grid layout
		>
			<AnalogClock city={city} />
		</div>
	);
};

export default ClockItem;
