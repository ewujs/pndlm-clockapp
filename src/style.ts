import { CSSObject } from '@emotion/react'
import '@fontsource/ibm-plex-mono'

export enum AppColor {
	White = 'white',
	Black = 'black',
	Transparent = 'transparent',
}

const colors: AppColors = {
	white: '#ffffff',
	black: '#000000',
	transparent: 'transparent',
}

export type AppColors = {
	[name in AppColor]: string
}

export const globalStyle: CSSObject = {
	'html': {
		backgroundColor: colors.black,
	},
	'body': {
		backgroundColor: colors.black,
		color: colors.white,
		fontFamily: `'IBM Plex Mono', monospace`,
	},
	'#reactroot': {
		display: 'flex',
		minHeight: '100vh',
	},
}

export interface AppTheme {
	colors: AppColors
}

export const defaultTheme: AppTheme = {
	colors,
}
