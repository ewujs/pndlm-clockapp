import { ThemeProvider } from '@emotion/react'
import { defaultTheme } from './style'
import { useAppSelector } from './redux/storeHooks'
import LoginPage from './pages/LoginPage'

const AppRoot = () => {
	const booted = useAppSelector(state => state.app.booted)

	if(!booted) {
		return null
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<LoginPage />
		</ThemeProvider>
	)
}

export default AppRoot
