import { createSlice } from '@reduxjs/toolkit'
import type { AppThunk } from './store'

const appSlice = createSlice({
	name: 'app',
	initialState: {
		APP_ENV: null,
		APP_BUILDTIME: null,
		
		// for initial boot
		booted: false,
		authenticated_user: null,
	},
	reducers: {
		appSetStatus(state) {
			state.booted = true
		}
	},
})

export const { appSetStatus } = appSlice.actions
export default appSlice.reducer

export const appBoot = (): AppThunk<void> => (dispatch) => {
	dispatch(appSetStatus())
}

