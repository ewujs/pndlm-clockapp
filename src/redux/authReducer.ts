import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { LoginPayload, AuthState, AuthResponse } from '@/types/authTypes';
import UserApi from '../api/userApi';
import { tokenStorage, getErrorMessage } from '@/utils';

/**
 * Initial state for the auth slice.
 */
const initialState: AuthState = {
	user: null,
	accessToken: tokenStorage.get(),
	loading: false,
	error: null,
	errorVisible: false,
};

/**
 * Async thunk action creator for handling user login.
 * Dispatches 'auth/login/pending', 'auth/login/fulfilled', or 'auth/login/rejected' actions.
 *
 * On success ('fulfilled'), the action payload will be the `LoginResponse` object.
 * On failure ('rejected'), the action payload will be an error message string.
 */
export const login = createAsyncThunk(
	'auth/login',
	async (
		{
			credentials,
			rememberMe
		}: { credentials: LoginPayload; rememberMe: boolean },
		thunkAPI
	) => {
		try {
			const response = await UserApi.login(credentials);

			if (window.location.hostname === 'localhost') {
				tokenStorage.set(response.accessToken, rememberMe);
			}

			return response;
		} catch (error: unknown) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	},
);

/**
 * Redux Toolkit slice for managing authentication state.
 * It handles synchronous actions like logout and error visibility, and asynchronous
 * actions like login via `extraReducers`.
 */
const authSlice = createSlice({
	name: 'auth',
	initialState,
	/**
	 * Synchronous reducer functions for directly modifying the authentication state.
	 * Uses Immer internally for allowing direct state manipulation syntax.
	 */
	reducers: {
		logoutUser: (state) => {
			tokenStorage.clear();
			state.user = null;
			state.accessToken = null;
			state.loading = false;
			state.error = null;
			state.errorVisible = false;
		},
		setUserFromStorage: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
		showError: (state) => {
			state.errorVisible = true;
		},
		clearError: (state) => {
			state.error = null;
			state.errorVisible = false;
		},
	},
	/**
	 * Handles actions defined outside this slice, asynchronous actions
	 * created with the `login` thunk.
	 */
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<AuthResponse>) => {
					state.loading = false;
					state.user = action.payload;
					state.accessToken = action.payload.accessToken;
				})
			.addCase(login.rejected, (state, action) => {
				state.accessToken = null;
				state.loading = false;
				state.error = action.payload as string;
			});
	}
});

export const { logoutUser, setUserFromStorage, showError, clearError } = authSlice.actions;
export default authSlice.reducer;
