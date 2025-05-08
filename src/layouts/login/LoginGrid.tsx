/** @jsxImportSource @emotion/react */
import React from 'react';
import type { GridProps } from '@/types/commonTypes';
import {
	baseLoginPageStyle,
	loginGridRwdStyle,
	loginGridMobileLandscapeStyle,
	loginGridUltraSmallStyle,
	loginGridUltraSmallLandscapeStyle,
	loginGridLargePortraitStyle,
} from '@/styles/loginGridStyles';

/**
 * Wraps login page content in a responsive CSS grid layout.
 * It applies adaptive grid styles depending on device size and orientation.
 *
 * @component
 * @param {GridProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the grid layout
 * @returns {React.ReactElement} The styled grid container for the login layout
 */
const LoginGrid = ({ children }: GridProps): React.ReactElement => {
	return (
		<div css={[
			baseLoginPageStyle,
			loginGridRwdStyle,
			loginGridMobileLandscapeStyle,
			loginGridUltraSmallStyle,
			loginGridUltraSmallLandscapeStyle,
			loginGridLargePortraitStyle,
		]}>
			{children}
		</div>
	);
};

export default LoginGrid;
