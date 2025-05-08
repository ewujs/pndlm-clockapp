import type { ClockState } from '@/types/clockTypes';
import { CLOCKS_CONFIG } from '@/config/clocksConfig';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Initial state for the clock slice.
 * Includes current timestamp (`now`) and default timezone configs for Taipei (`tpe`) and Las Vegas (`lv`).
 */
const initialState: ClockState = {
	now: Date.now(),
	tpe: {
		timeZone: CLOCKS_CONFIG.tpe.timeZone,
		label: '',
	},
	lv: {
		timeZone: CLOCKS_CONFIG.lv.timeZone,
		label: '',
	},
};

/**
 * Redux Toolkit slice for managing clock state.
 * Includes reducers for updating current time and timezone configurations.
 */
const clockSlice = createSlice({
	name: 'clock',
	initialState,
	reducers: {
		/**
		 * Updates the clock state with a new `now` timestamp and new configurations
		 * for the `tpe` and `lv` clocks.
		 * Performs safe type-checking to ensure values are valid objects before updating.
		 */
		updateClocks(state, action: PayloadAction<ClockState>) {
			state.now = action.payload.now;
			state.tpe = typeof action.payload.tpe === 'object' && action.payload.tpe !== null
				? { ...action.payload.tpe }
				: state.tpe;
			state.lv = typeof action.payload.lv === 'object' && action.payload.lv !== null
				? { ...action.payload.lv }
				: state.lv;
		},
	},
});

export const { updateClocks } = clockSlice.actions;
export default clockSlice.reducer;
