// https://emotion.sh/docs/typescript#define-a-theme
import '@emotion/react'
import type { AppTheme } from './style'

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface Theme extends AppTheme {}
}
