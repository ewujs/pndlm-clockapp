import type { ThemeState, ThemeMode, ClockFace } from '@/types/themeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * The initial state configuration for the theme slice.
 * Defines the default theme mode.
 */
const initialState: ThemeState = {
	mode: 'light', // Default theme mode is 'light'
	clockFace: 'minimalist', // Default clock face style is 'minimalist'
};

/**
 * Redux Toolkit slice for managing theme state.
 * Handles theme mode changes (toggling or setting explicitly).
 */
const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleMode(state) {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
		setMode(state, action: PayloadAction<ThemeMode>) {
			state.mode = action.payload;
		},
		setClcokFace(state, action: PayloadAction<ClockFace>) {
			state.clockFace = action.payload;
		}
	},
});

export const { toggleMode, setMode, setClcokFace } = themeSlice.actions;
export default themeSlice.reducer;
