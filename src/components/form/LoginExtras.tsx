/** @jsxImportSource @emotion/react */
import React from 'react';
import RememberMeCheckbox from './RememberMeCheckbox';
import {
	forgotPasswordLinkStyle,
	forgotPasswordMobileLandscapeStyle,
	forgotPasswordTabletStyle,
	forgotPasswordDesktopStyle,
} from '@/styles/loginPageStyles';

/**
 * Renders additional options below the login fields:
 * - A "Forgot Password?" link that currently triggers a placeholder alert.
 * - A "Remember Me" checkbox.
 *
 * @component
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - The props for the component.
 * @returns {React.ReactElement} The rendered login extras section.
 */
const LoginExtras = ({
	checked,
	onChange
}: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement => (
	<>
		<a
			css={[forgotPasswordLinkStyle, forgotPasswordMobileLandscapeStyle, forgotPasswordTabletStyle, forgotPasswordDesktopStyle]}
			href="#"
			onClick={() => alert('coming soon')}
		>
			Forgot Password?
		</a>
		<RememberMeCheckbox checked={checked} onChange={onChange} />
	</>
);

export default LoginExtras;
