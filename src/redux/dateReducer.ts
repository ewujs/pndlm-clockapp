// src/store/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { scheduleMultiMidnightUpdates } from '@/utils';
import type { ZoneDateState } from '@/types/clockTypes';
import type { AppDispatch } from './store';

const initialState: ZoneDateState = {};

/**
 * Redux slice for managing formatted date strings by time zone.
 *
 * This slice stores the current formatted date (e.g., '2025-04-30') for each
 * specified time zone. It supports setting the date explicitly via an action.
 */
const dateSlice = createSlice({
	name: 'zoneDate',
	initialState,
	reducers: {
		// Updates the formatted date string for a specific time zone
		setFormattedDate(state, action: PayloadAction<{ tz: string; date: string }>) {
			state[action.payload.tz] = action.payload.date;
		},
	},
});

export const { setFormattedDate } = dateSlice.actions;
export default dateSlice.reducer;

let cleanup: () => void;

/**
 * Starts a scheduled updater that dispatches formatted date updates at local midnights
 * for each specified time zone.
 *
 * @param dispatch - The Redux dispatch function.
 * @param timeZones - Array of IANA time zone strings to track.
 */
export const startMidnightUpdater = (dispatch: AppDispatch, timeZones: string[]) => {
	if (cleanup) cleanup();

	cleanup = scheduleMultiMidnightUpdates(timeZones, (tz) => {
		const date = new Date().toLocaleDateString('en-CA', { timeZone: tz });
		dispatch(setFormattedDate({ tz, date }));
	});
};

/**
 * Stops the active midnight update scheduler, if any.
 */
export const stopMidnightUpdater = () => {
	if (cleanup) cleanup();
};

/**
 * Initializes formatted date state for multiple time zones and starts a midnight update scheduler.
 *
 * @param dispatch - The Redux dispatch function.
 * @param timeZones - Array of IANA time zone strings to track.
 * @param now - Optional timestamp to base the initial date calculations on (defaults to current time).
 */
export const initializeZoneDateScheduling = (
	dispatch: AppDispatch,
	timeZones: string[],
	now: number = Date.now()
) => {
	timeZones.forEach((tz) => {
		const date = new Date(now).toLocaleDateString('en-CA', { timeZone: tz });
		dispatch(setFormattedDate({ tz, date }));
	});
	startMidnightUpdater(dispatch, timeZones);
};
