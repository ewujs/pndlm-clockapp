import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './storeTypes'

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
		appStatusSet(state) {
			state.booted = true
		}
	},
})

export const { appStatusSet } = appSlice.actions
export default appSlice.reducer

export const appBoot = (): AppThunk<void> => (dispatch) => {
	dispatch(appStatusSet())
}

