import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootReducer, store } from './store'
import { ThunkAction, UnknownAction } from '@reduxjs/toolkit'

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// https://redux.js.org/usage/usage-with-typescript

// "Since these are actual variables, not types, it's important to define them
// in a separate file such as app/hooks.ts, not the store setup file. This
// allows you to import them into any component file that needs to use the
// hooks, and avoids potential circular import dependency issues."

// using this AppDispatch fixes async dispatch with TS
// "Use throughout your app instead of plain `useDispatch` and `useSelector`"
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	UnknownAction
>
