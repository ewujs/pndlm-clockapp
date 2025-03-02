import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import { defaultTheme } from './style'
import { useAppSelector } from './redux/storeTypes'
import pndlmLogoSvg from '/4row-white.svg'

const InterfaceContainer = styled.div(({theme}) => ({
	backgroundColor: theme.colors.black,
	color: theme.colors.white,
	width: '100vw',
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	rowGap: '1rem',
}))

const Signature = styled.img({
	width: '15rem',
})

const GlassEmoji = styled.div({
	fontSize: '2rem',
})

const AppRoot = () => {
	const booted = useAppSelector(state => state.app.booted)

	if(!booted) {
		return null
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<InterfaceContainer>
				<Signature src={pndlmLogoSvg} alt="☵☲ PNDLM" />
				<GlassEmoji>🥃</GlassEmoji>
				Cheers!  Let's get started...
			</InterfaceContainer>
		</ThemeProvider>
	)
}

export default AppRoot
