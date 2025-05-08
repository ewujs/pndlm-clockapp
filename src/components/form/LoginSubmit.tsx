/** @jsxImportSource @emotion/react */
import React from 'react';
import type { ButtonProps } from '@/types/commonTypes';
import {
	loginBottonContainerStyle,
	loginBottonMobileLandscapeStyle,
	loginBottonUltraSmallStyle,
	loginBottonDesktopStyle,
	loginButtonTabletStyle,
} from '@/styles/loginPageStyles';
import LoginButton from '@/components/buttons/LoginButton';

/**
 * A wrapper component for the login submission button.
 * Applies responsive styles and passes loading state to the button.
 *
 * @component
 * @param {ButtonProps} props - The props for the component.
 * @returns {React.ReactElement} The styled submit button container with the login button.
 */
const LoginSubmit = ({ loading }: ButtonProps): React.ReactElement => (
	<div
		css={[
			loginBottonContainerStyle,
			loginBottonMobileLandscapeStyle,
			loginBottonUltraSmallStyle,
			loginBottonDesktopStyle,
			loginButtonTabletStyle
		]}
	>
		<LoginButton type="submit" loading={loading} />
	</div>
);

export default LoginSubmit;
