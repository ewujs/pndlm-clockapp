import { CSSObject } from '@emotion/react'
import '@fontsource/ibm-plex-mono'

export enum AppColor {
	White = 'white',
	Black = 'black',
	Transparent = 'transparent',
	Green = 'green',
	Red = 'red',
	PinkishRed = 'pinkishRed',
	DarkRed = 'darkRed',
	Raspberry = 'raspberry',
	Blue = 'blue',
	LightBlue = 'lightBlue',
	SoftBlue = 'softBlue',
	SoftBlueDk = 'softBlueDk',
	DarkGray = 'darkGray',
	LightGray = 'lightGray',
	BlackishGray = 'blackishGray',
	Orange = 'orange',
	Yellow = 'yellow',
	Translucent = 'translucent',
	SemiTransparent = 'semiTransparent',
	Opaque = 'opaque',
}

const colors: AppColors = {
	white: '#ffffff',
	black: '#000000',
	transparent: 'transparent',
	green: '#78be43',
	red: '#d81e5b',
	pinkishRed: '#f44336',
	darkRed: '#b50445',
	raspberry: '#d81e5b',
	blue: '#0c8ad6',
	lightBlue: '#86f2ff',
	softBlue: '#b9cedb',
	softBlueDk: '#869ac0',
	darkGray: '#3d4045',
	lightGray: '#f2f2f2',
	blackishGray: '#1e1e1e',
	orange: '#ff8c05',
	yellow: '#ffff00',
	translucent: 'rgba(255, 255, 255, 0.2)',
	semiTransparent: 'rgba(0, 0, 0, 0.6)',
	opaque: 'rgba(0, 0, 0, 0.2)',
}

export type AppColors = {
	[name in AppColor]: string
}

export enum AppFontSize {
	XSmall = 'xsmall',
	Small = 'small',
	Medium = 'medium',
	Large = 'large',
	XLarge = 'xlarge',
}

export type AppFontSizes = {
	[name in AppFontSize]: string
}

const fontSizes: AppFontSizes = {
	xsmall: 'clamp(0.75rem, 1.1vw, 0.875rem)',
	small: 'clamp(0.875rem, 1.25vw, 1rem)',
	medium: 'clamp(1rem, 1.5vw, 1.125rem)',
	large: 'clamp(1.125rem, 2vw, 1.5rem)',
	xlarge: 'clamp(1.25rem, 2.5vw, 2rem)',
}

export const globalStyle: CSSObject = {
	'html': {
		backgroundColor: colors.green,
	},
	'body': {
		backgroundColor: colors.transparent,
		color: colors.white,
		fontFamily: `'Figtree', sans-serif`,
		margin: 0,
	},
	'#reactroot': {
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
	},
}

export interface AppTheme {
	colors: AppColors
	fontSizes: AppFontSizes
	mode: 'light' | 'dark' | 'luxury'
	fontFamily?: `'Figtree', sans-serif` | `'Didot', 'Bodoni MT', 'Noto Serif Display', serif`
	clockColors: {
		background: string
		tickColor: string
		handColor: string
		secondHandColor: string
		centerDotColor: string
		color?: string
		hourColor?: string
		backgroundBlendMode?: string
	}
}

export const defaultTheme: AppTheme = {
	colors,
	fontSizes,
	mode: 'light',
	clockColors: {
		background: colors.white,
		tickColor: colors.softBlueDk,
		handColor: colors.raspberry,
		secondHandColor: colors.orange,
		centerDotColor: colors.softBlue,
		color: colors.softBlue,
		hourColor: colors.black,
	},
}

export const darkTheme: AppTheme = {
	colors,
	fontSizes,
	mode: 'dark',
	clockColors: {
		background: colors.blackishGray,
		tickColor: colors.lightGray,
		handColor: colors.raspberry,
		secondHandColor: colors.orange,
		centerDotColor: colors.lightGray,
	},
}

export const luxuryTheme: AppTheme = {
	colors,
	fontSizes,
	mode: 'luxury',
	fontFamily: `'Didot', 'Bodoni MT', 'Noto Serif Display', serif`,
	clockColors: {
		background: `
			radial-gradient(
				circle at 50% 50%,
				color-mix(in oklab, #E2CA7D 20%, white) 45%,
				color-mix(in oklab, gold 80%, #E2CA7D) 47%,
				color-mix(in oklab, gold 80%, #E2CA7D) 49%,
			 #E2CA7D 51%,
				color-mix(in oklab, #E2CA7D 85%, black) 95%
			),
			linear-gradient(
				145deg,
				rgba(255, 255, 255, 0.5) 10%,
				rgba(255, 255, 255, 0.2) 30%,
				rgba(255, 255, 255, 0) 50%,
				rgba(255, 255, 255, 0.1) 70%,
				rgba(255, 255, 255, 0.3) 90%
			)
		`,
		backgroundBlendMode: 'screen',
		tickColor: colors.lightGray,
		handColor: '#3f3411',
		secondHandColor: '#dda407',
		centerDotColor: '#413305',
		color: colors.black,
	},
}

export const themeMap = {
	light: defaultTheme,
	dark: darkTheme,
	luxury: luxuryTheme,
}
