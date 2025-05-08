import React from 'react';
import type { ButtonProps } from '@/types/commonTypes';
import Button from './Button';

/**
 * Renders the login button used in the login form.
 *
 * - Displays a loading state if `loading` is true.
 * - Disables the button while loading to prevent duplicate submissions.
 *
 * @component
 * @param {ButtonProps} props - The props for the component.
 * @param {'button' | 'submit' | 'reset'} props.type - The button type attribute.
 * @param {boolean} props.loading - Indicates if the login process is currently loading.
 * @returns {React.ReactElement} The rendered login button.
 */
const LoginButton = ({ type, loading }: ButtonProps): React.ReactElement => {
	return (
		<Button type={type} disabled={loading}>
			{loading ? 'Loading...' : 'Login'}
		</Button>
	);
};

export default LoginButton;
