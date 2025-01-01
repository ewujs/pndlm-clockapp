import React, { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store'
import { Global as EmotionGlobal } from '@emotion/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { appBoot } from './redux/appReducer'
import AppRoot from './AppRoot'
import { globalStyle } from './style'

const App = () => {
	useEffect(() => {
		store.dispatch(appBoot())
	}, [])

	return (
		<ReduxProvider store={store}>
			<EmotionGlobal styles={globalStyle} />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppRoot />} />
				</Routes>
			</BrowserRouter>
		</ReduxProvider>
	)
}

export default App
