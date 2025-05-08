/** @jsxImportSource @emotion/react */
import React from 'react';
import type { ClockDateDayProps } from '@/types/clockTypes';
import { useAppSelector } from '@/redux/storeHooks';
import { AppRootState } from '@/redux/store';
import { dateDayStyle } from '@/styles/clocksPageStyles';

/**
 * Renders the day portion of the date for a given time zone.
 *
 * This component reads the formatted date from the Redux store for the provided `timeZone`,
 * extracts the day part (DD) from the `YYYY-MM-DD` string format, and displays it.
 *
 * @component
 * @param {ClockDateDayProps} props - Component props.
 * @returns {React.ReactElement} A styled <time> element showing the day.
 */
const ClockDateDay = ({ timeZone }: ClockDateDayProps): React.ReactElement => {
	const formattedDate = useAppSelector((state: AppRootState) => state.zoneDate[timeZone]);
	const [,,day] = formattedDate?.split('-').map(Number) || [];

	return (
		<time css={dateDayStyle}>{day}</time>
	);
};

export default ClockDateDay;
