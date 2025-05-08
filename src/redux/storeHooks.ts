import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppDispatch, AppRootState, AppStore } from './store'

// https://redux.js.org/usage/usage-with-typescript
// "Since these are actual variables, not types, it's important to define them
// in a separate file such as app/hooks.ts, not the store setup file. This
// allows you to import them into any component file that needs to use the
// hooks, and avoids potential circular import dependency issues."

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>()
export const useAppStore = useStore.withTypes<AppStore>()
