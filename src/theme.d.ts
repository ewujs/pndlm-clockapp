// https://emotion.sh/docs/typescript#define-a-theme
import '@emotion/react'
import { AppTheme } from './style'

declare module '@emotion/react' {
	export interface Theme extends AppTheme {}
}
