import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer'

// https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
export const rootReducer = combineReducers({
	app: appReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefault) => getDefault().concat(
		// custom middleware goes here
	),
})
